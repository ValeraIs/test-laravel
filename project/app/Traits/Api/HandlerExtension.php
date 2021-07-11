<?php

namespace App\Traits\Api;

use App\Response\ServerResponse;
use Illuminate\Contracts\Support\MessageBag;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;

/**
 * Trait HandlerExtension
 *
 * @package App\Traits\Api
 */
trait HandlerExtension
{
    /**
     * Prepare a JSON response for the given exception.
     *
     * @param Request $request
     * @param Throwable $exception
     *
     * @return ServerResponse
     */
    protected function prepareJsonResponse($request,Throwable $exception)
    {
        return $this->serverResponse()
            ->status($this->getExceptionStatusCode($exception))
            ->withHeaders($this->isHttpException($exception) ? $exception->getHeaders() : [])
            ->errors([ $this->convertExceptionToArray($exception) ]);
    }

    /**
     * Return exception status code.
     *
     * @param Throwable $exception
     *
     * @return int
     */
    protected function getExceptionStatusCode(Throwable $exception): int
    {
        return $this->isHttpException($exception) ? $exception->getStatusCode() : 500;
    }

    /**
     * Convert the given exception to an array.
     *
     * @param Throwable $exception
     * @return array
     */
    protected function convertExceptionToArray(Throwable $exception): array
    {
        $isDebug = config('app.debug');

        return $this->serverResponse()
            ->getErrorArrayStructure(
                method_exists($exception, 'getErrorType') ? $exception->getErrorType() : class_basename($exception),
                __($exception->getMessage()),
                'non_field_error',
                [],
                $isDebug ? $exception->getFile() : null,
                $isDebug ? $exception->getLine() : null,
                $isDebug ? collect($exception->getTrace())->map(function ($trace) {
                    return Arr::except($trace, [ 'args' ]);
                })->all() : []
        );
    }

    /**
     * Create a response object from the given validation exception.
     *
     * @param  ValidationException $exception
     * @param  Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response|ServerResponse
     */
    protected function convertValidationExceptionToResponse(ValidationException $exception, $request)
    {
        return $request->expectsJson()
            ? $this->prepareValidationFails($exception->validator->failed(), $request, $exception->validator->getMessageBag(), $exception->errors())
            : $this->invalid($request, $exception);
    }

    /**
     * Prepare validation rules.
     *
     * @param $failed
     * @param Request $request
     * @param MessageBag $messages
     * @param null $errorsValidator
     *
     * @return ServerResponse
     */
    protected function prepareValidationFails($failed, Request $request, MessageBag $messages, $errorsValidator = null): ServerResponse
    {
        $response = $this->serverResponse()
            ->status(422);

        foreach ( $failed as $field => $rules ) {
            $count = 0;
            $errors = [];
            $values = [];
            foreach ( $rules as $rule => $parameters ) {
                $errors[] = $messages->get($field)[ $count ];
                $fieldValue = $request->input($field);
                $values = is_array($fieldValue) ? $fieldValue : [ $fieldValue ];
                $rules[] = Str::snake($rule);
                $count++;
            }

            $response->pushError('validation', $errors, $field, $values);
        }

        if ( empty($failed) && ! empty($errorsValidator) ) {
            foreach ( $errorsValidator as $field => $errorMessages ) {
                $response->pushError('validation', $errorMessages, $field, $request->input($field, []));
            }
        }

        return $response;
    }

    private function serverResponse(): ServerResponse
    {
        return new ServerResponse();
    }
}

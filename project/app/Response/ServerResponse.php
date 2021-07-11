<?php

namespace App\Response;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Collection;

/**
 * Class ServerResponse
 * @package App\Response
 */
class ServerResponse extends Response
{
    protected $content = [];

    /**
     * ServerResponse constructor.
     *
     * @param string $content
     * @param int $status
     * @param array $headers
     */
    public function __construct($content = '', $status = 200, array $headers = [])
    {
        parent::__construct($content, $status, $headers);
        $this->original = $this->getDefaultResponse(false, $status);
        $this->content = $this->original;

        return $this;
    }

    /**
     * @param $data
     *
     * @return $this
     */
    public function data($data): self
    {
        $this->content['data'] = $data;

        return $this;
    }

    /**
     * Return default response array
     *
     * @param bool $status
     * @param int $code
     *
     * @return Collection
     */
    protected function getDefaultResponse(bool $status, int $code = 200): Collection
    {
        return collect([
            'code'      => $code,
            'success'   => $status,
            'data'      => (object) [],
            'links'     => (object) [],
            'meta'      => (object) [],
            'errors'    => collect([]),
            'redirect'  => '',
        ]);
    }


    /**
     * Add to response result from resource.
     *
     * @param  $resource
     *
     * @return $this
     */
    public function resource($resource): ServerResponse
    {
        $resourceData = ['data' => $resource];

        if ($resource instanceof JsonResource) {
            $request = request();
            $resourceData = $resource->resource instanceof AbstractPaginator ?
                (new CustomPaginatedResourceResponse($resource))->getResponseContent($request)
                :
                (new CustomResourceResponse($resource))->getResponseContent($request);
        }

        $this->content = $this->content->merge($resourceData);

        return $this;
    }

    /**
     * Sends HTTP headers and content.
     *
     * @return Response
     */
    public function send(): Response
    {
        $this->setContent($this->content);

        return parent::send();
    }

    /**
     * Set Errors prop in server response.
     *
     * @param  $errors
     *
     * @return ServerResponse
     */
    public function errors($errors): ServerResponse
    {
        $this->content['errors'] = $errors;

        return $this;
    }


    /**
     * Set code status of response.
     *
     * @param int $code
     *
     * @return $this
     */
    public function status(int $code = 200): ServerResponse
    {
        $this->setStatusCode($code);
        $this->content['code'] = $code;
        $this->content['success'] = $code >= 200 && $code <= 299;

        return $this;
    }

    /**
     * Add one error to the response.
     *
     * @param $type
     * @param $errors
     * @param string $field
     * @param array $values
     * @param null $file
     * @param null $line
     * @param array $trace
     *
     * @return ServerResponse
     */
    public function pushError($type, $errors, string $field, array $values, $file = null, $line = null, array $trace = []): ServerResponse
    {
        if ( ! ( $this->content[ 'errors' ] instanceof Collection ) ) {
            $this->content->put('errors', collect($this->content[ 'errors' ]));
        }

        $this->content[ 'errors' ]->push($this->getErrorArrayStructure(
            $type, $errors, $field, $values, $file, $line, $trace
        ));

        return $this;
    }

    /**
     * Return error array structure.
     *
     * @param $type
     * @param $errors
     * @param $field
     * @param $values
     * @param null $file
     * @param null $line
     * @param array $trace
     *
     * @return array
     */
    public function getErrorArrayStructure($type, $errors, $field, $values, $file = null, $line = null, array $trace = []): array
    {
        return [
            'field'  => $field,
            'type'   => $type,
            'errors' => is_array($errors) ? $errors : [$errors],
            'values' => $values,
            'file'   => $file,
            'line'   => $line,
            'trace'  => $trace,
        ];
    }

}

<?php

namespace App\Traits\Api;

use App\Repositories\CoreCRUDRepository;
use App\Response\ServerResponse;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Ramsey\Collection\Collection;

/**
 * Trait RestApiCRUDActionsTrait
 * @package App\Actions\Traits
 */
trait RestApiCRUDActionsTrait
{
    protected CoreCRUDRepository $repository;

    /**
     * Field in table for getting row
     *
     * @var string
     */
    protected string $fieldModelId = 'id';

    /**
     * Show all data entity with pagination
     *
     * @return Response
     */
    public function index(): Response
    {
        $items = $this->repository->index();

        return $this->getServerResponseWithContent($items)
            ->send();
    }

    /**
     * Show one entity
     *
     * @param Request $request
     *
     * @return Response
     */
    public function show(Request $request): Response
    {
        $this->repository->setEntity($this->fieldModelId, $request->route($this->getRouteName()));

        $item = $this->repository->show();

        return $this->getServerResponseWithContent($item)
            ->send();
    }

    /**
     * Create a new entity
     *
     * @return Response
     */
    public function store(): Response
    {
        $item = $this->repository->store($this->getActionRequest());

        return $this->getServerResponseWithContent($item)
            ->send();
    }

    /**
     * Update exits entity
     *
     * @param Request $request
     *
     * @return Response
     */
    public function update(Request $request): Response
    {
        $this->repository->setEntity($this->fieldModelId, $request->route($this->getRouteName()));

        $item = $this->repository->update($this->getActionRequest());

        return $this->getServerResponseWithContent($item)
            ->send();
    }

    /**
     * Delete entity
     *
     * @param Request $request
     *
     * @return Response
     */
    public function destroy(Request $request): Response
    {
        $this->repository->setEntity($this->fieldModelId, $request->route($this->getRouteName()));

        $this->repository->delete();

        return $this->serverResponse()
            ->send();
    }

    /**
     * Get items for response
     *
     * @param $data
     *
     * @return mixed
     */
    private function getItems($data)
    {
        if ($this->needResourceClass()) {
            return $this->getResourceCollection($data);
        }
        return $data;
    }

    /**
     * Get resource object or collection of resources
     *
     * @param $data
     *
     * @return mixed
     */
    private function getResourceCollection($data)
    {
        if ($data instanceof Model) {
            return app($this->resourceClass(), ['resource' => $data]);
        } elseif ($data instanceof LengthAwarePaginator || $data instanceof Collection ) {
            return $this->resourceClass()::collection($data);
        } else {
            return [];
        }
    }

    /**
     * Get response with resource or collection
     *
     * @param $data
     *
     * @return ServerResponse
     */
    private function getServerResponseWithContent($data): Response
    {
        if ($this->needResourceClass()) {
            return $this->serverResponse()
                ->resource($this->getItems($data));
        } else {
            return $this->serverResponse()
                ->data($data);
        }
    }

    /**
     * Get model name for route
     *
     * @return string
     */
    private function getRouteName(): string
    {
        return Str::snake(class_basename($this->repository->getModel()));
    }
}

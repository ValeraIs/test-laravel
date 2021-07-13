<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Class CoreCRUDRepository
 * @package App\Repositories
 */
abstract class CoreCRUDRepository extends CoreRepository
{
    /**
     * Get all data from model with pagination
     *
     * @return LengthAwarePaginator
     */
    public function index()
    {
        return $this->model
            ->with($this->withRelations())
            ->paginate(50);
    }

    /**
     * Create one
     *
     * @param FormRequest $request
     *
     * @return Model
     */
    public function store(FormRequest $request)
    {
        $this->model
            ->fill($request->validated())
            ->save();

        return $this->model
            ->load($this->withRelations());
    }

    /**
     * @param FormRequest $request
     *
     * @return Model
     */
    public function update(FormRequest $request)
    {
        $this->model
            ->fill($request->validated())
            ->save();

        return $this->model
            ->load($this->withRelations());
    }

    /**
     * @return Model
     */
    public function show()
    {
        return $this->model
            ->load($this->withRelations());
    }

    /**
     * @return bool|null
     */
    public function delete(): ?bool
    {
        return $this->model
            ->delete();
    }

    public function setEntity($field, $value): Model
    {
        return $this->setModel(
            $this->model::where($field, $value)
                ->firstOrFail()
        );
    }

    /**
     * Set relations for load in request
     *
     * @return array
     */
    protected function withRelations():array
    {
        return [];
    }
}

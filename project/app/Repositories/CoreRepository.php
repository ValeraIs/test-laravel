<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CoreRepository
 * @package App\Repositories
 */
abstract class CoreRepository
{
    protected Model $model;

    /**
     * CoreRepository constructor.
     */
    public function __construct()
    {
        $this->makeModel();
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    abstract protected function model(): string;

    /**
     * Make model instance.
     *
     * @return Model
     */
    public function makeModel(): Model
    {
        $this->model = app($this->model());

        return $this->model;
    }

    /**
     * Get model instance
     *
     * @return Model
     */
    public function getModel(): Model
    {
        return $this->model;
    }

    /**
     * Set model instance
     *
     * @param Model $model
     *
     * @return Model
     */
    public function setModel(Model $model): Model
    {
        $this->model = $model;

        return $this->model;
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CoreCRUDRepository;
use App\Traits\Api\RestApiCRUDActionsTrait;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class CoreCRUDController
 * @package App\Http\Controllers
 */
abstract class CoreCRUDController extends Controller
{
    use RestApiCRUDActionsTrait;

    /**
     * CoreCRUDController constructor.
     *
     * @param CoreCRUDRepository $repository
     */
    public function __construct(CoreCRUDRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Specify Form request class name
     *
     * @return string
     */
    abstract protected function requestClass(): string;

    /**
     * Specify Json Resource class name
     *
     * @return string|null
     */
    abstract protected function resourceClass(): ?string;

    /**
     * Get form request object
     *
     * @return FormRequest
     */
    protected function getActionRequest(): FormRequest
    {
        return app($this->requestClass());
    }

    /**
     * Check that need use resource prepare data
     *
     * @return bool
     */
    protected function needResourceClass(): bool
    {
        return $this->resourceClass() !== null;
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class MiningRequest
 * @package App\Http\Requests
 */
class MiningRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'company_id' => ['required', 'exists:companies,id'],
            'mined' => ['required', 'integer'],
            'date_mined' => ['required', 'date_format:Y-m-d H:i:s'],
        ];
    }
}

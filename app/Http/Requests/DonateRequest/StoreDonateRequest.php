<?php

namespace App\Http\Requests\DonateRequest;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'slug' => 'nullable|string|max:255|unique:pages,slug',
            'order' => 'nullable|integer',
            'company_name' => 'required|string|max:255',
            'accounts_name' => 'required|string|max:255',
            'account_number' => 'required|string',
            'branch_name' => 'nullable|string',
        ];
    }
}

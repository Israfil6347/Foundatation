<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|confirmed|min:6',
            'phone'=>'required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'role' => [
                'required',
                Rule::in(['Super Admin', 'Admin', 'Content Manager', 'Visitor'])
            ],
        ];
    }
}

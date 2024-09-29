<?php

namespace App\Http\Requests\Publication;

use Illuminate\Foundation\Http\FormRequest;

class PublicationStoreRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'order' => 'nullable|integer',
            'shortDescription' => 'nullable|string|max:255',
            'body' => 'required|string',
            'summary' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|url|max:255',
            'published' => 'boolean',
            'subtitle'=> 'required|string',
            'attachment' => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf|max:10240', // 10MB max
        ];
    }
}

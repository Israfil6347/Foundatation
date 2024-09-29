<?php

namespace App\Http\Requests\Notice;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoticeRequest extends FormRequest
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
            'attachment' => 'file|mimes:jpeg,png,pdf|max:2048', // 2MB max
        ];
    }
}

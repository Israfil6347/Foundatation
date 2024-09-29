<?php

namespace App\Http\Resources\user;

use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    private function getActiveLink()
    {
        if (Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin') {
            return new LinkObject("inactive", "Activate User", route('users.updateUserActiveStatus', $this->id), "PATCH", 'fa-solid fa-face-smile');
        } else {
            return null;
        }
    }

    private function getInactiveLink()
    {
        if (Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin') {
            return new LinkObject("active", "Deactivate User", route('users.updateUserActiveStatus', $this->id), "PATCH", 'fa-solid fa-skull');
        } else {
            return null;
        }
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'photo' => $this->photo ? asset($this->photo) : null,
            'role' => $this->role,
            'status' => $this->status,
            'links' => [
                new LinkObject("index", "Users", route('users.index'),  "GET", 'fa-solid fa-list-ul'),
                $this->status ? $this->getInactiveLink() : $this->getActiveLink(),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' ? new LinkObject("update", "Edit User", route('users.edit', $this->id), "PUT", 'fa-solid fa-pen-to-square') : null,
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' ? new LinkObject("destroy", "Delete User", route('users.destroy', $this->id), "DELETE", 'fa-solid fa-trash-can') : null,
            ],
        ];
    }
}

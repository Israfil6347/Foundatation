<?php

namespace App\Repositories\User;


interface UserRepositoryInterface
{
    public function all($perPage, $searchText);

    public function store($request);

    public function getPage(string $id);

    public function updateUserActiveStatus($id);

    public function deletePage($id);

    public function updatePage($request, string $id);
  
}

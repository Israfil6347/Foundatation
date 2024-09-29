<?php

namespace App\Repositories\Publication;

interface PublicationRepositoryInterface{

     public function findBySlug(string $slug);

     public function create(array $data);
     public function all($perPage, $searchText);
     public function getPage(string $id);

     public function updatePage($request, string $id);

     public function deletePage($id);

     public function updateDraftStatus($id);

    public function updatePublishStatus($id);

     public function allPublication();
     
}
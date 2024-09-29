<?php

namespace App\Repositories\Gallery;

interface GalleryRepositoryInterface
{
     public function all($perPage, $searchText);

     public function findBySlug(string $slug);

     public function create(array $data);

     public function getPage(string $id);

     public function updatePage($request, string $id);

     public function deletePage($id);

     public function updateDraftStatus($id);

     public function updatePublishStatus($id);

     public function createGalleryImage($data);

     public function deleteGalleryImagePage($id);

     public function allGallery();

}

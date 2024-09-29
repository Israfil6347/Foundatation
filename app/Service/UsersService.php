<?php

namespace App\Service;

use App\Repositories\User\UserRepositoryInterface;

class UsersService{

    protected $userRepository;

    public function __construct(UserRepositoryInterface $UserRepository)
    {
        $this->userRepository = $UserRepository;
    }

    public function all($perPage, $searchText)
    {
        return $this->userRepository->all($perPage, $searchText);
    }
    public function store($request)
    {

        if (isset($request['photo'])) {
            $attachmentFile = $request['photo'];
            $imageName = time().'.'.$attachmentFile->getClientOriginalExtension();
            $attachmentPath =  "UserImage";
            $attachmentFile->move(public_path($attachmentPath), $imageName);
            $request['photo'] = url($attachmentPath.'/' . $imageName);
        }
        return $this->userRepository->store($request);


    }

      public function getPage($id){

        return $this->userRepository->getPage($id);
    }

    public function deletePage($id){
        $this->userRepository->deletePage($id);
    }

       public function updateUserActiveStatus( $id)
    {
        return $this->userRepository->updateUserActiveStatus( $id);
    }

    public function updatePage($request, $id){

        if (isset($request['photo'])) {
            $attachmentFile = $request['photo'];
            $imageName = time().'.'.$attachmentFile->getClientOriginalExtension();
            $attachmentPath =  "UserImage";
            $attachmentFile->move(public_path($attachmentPath), $imageName);
            $request['photo'] = url($attachmentPath.'/' . $imageName);
        }
        
        return $this->userRepository->updatePage($request, $id);
    }


}
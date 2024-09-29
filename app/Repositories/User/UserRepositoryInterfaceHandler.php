<?php

namespace App\Repositories\User;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepositoryInterfaceHandler implements UserRepositoryInterface {

    public function all($perPage, $searchText)
    {
        return User::where('name', 'like', '%' . $searchText . '%')->orWhere('email', 'like', '%' . $searchText . '%')->orderBy('name', 'ASC')->paginate($perPage);
    }

    public function store($request)
    {
        $user = new User();
        $user->name = $request['name'];
        $user->phone = $request['phone'];
        $user->photo = $request['photo'];
        $user->email = $request['email'];
        $user->role = $request['role'];
        $user->password = Hash::make($request['password']);
        $user->save();
        return $user;    
    }

     public function getPage(string $id){

        return User::find($id);
    }

     public function updateUserActiveStatus($id)
    {
        $post = User::find($id);
        $post->status = !$post->status;
        $post->update();
        return $post;
    }
    public function deletePage($id){
      $page = User::find($id);
        if (!$page) {
            throw new \Exception('Page not found.');
        }
       return  $page->delete();
    }

    public function updatePage($request, $id){

        // dd($request);

        $updatePage = User::find($id);
        
        if ($updatePage === null) {
            throw new \Exception("Page not found");
        }

        $updatePage->name = $request->input('name');
        $updatePage->phone = $request->input('phone');
        $updatePage->photo = $request->input('photo');
        $updatePage->email = $request->input('email');
        $updatePage->role =  $request->input('role');
        $updatePage->password = Hash::make($request->input('password'));
        return $updatePage->save();
    }



}
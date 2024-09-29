<?php

namespace App\Http\Controllers;

use App\Http\Resources\Gallery\GalleryResource;
use App\Service\GalleryService;
use Inertia\Inertia;

class PublicController extends Controller
{
    //

    public function about()
    {
        //
        return Inertia::render('About/Index' );
    }
    public function notice()
    {
        //
         return Inertia::render('Notices/Index' );
    }

    public function donate(){
        return Inertia::render('Donate/Index' );
    }

    public function faq(){
          return Inertia::render('Faq/Index' );
    }

    public function contact(){
           return Inertia::render('Contact/Index' );
    }

    public function history(){
        return Inertia::render('About/AboutPage/History' );
    }
    public function missionAndVision(){
        return Inertia::render('About/AboutPage/Mission' ); 
    }
    public function structureAndPartners(){
        return Inertia::render('About/AboutPage/StructureandPartners' );
    }

    public function activities(){
        return Inertia::render('About/AboutPage/Activities' );
    }

    public function chairmanMessage(){
         return Inertia::render('About/AboutPage/ChairmanMessage' );
    } 
}

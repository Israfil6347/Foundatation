<?php

namespace App\Providers;

use App\Repositories\Donate\DonateRepositoryInterface;
use App\Repositories\Donate\DonateRepositoryInterfaceHandler;
use App\Repositories\Gallery\GalleryRepositoryInterface;

use App\Repositories\Gallery\GalleryRepositoryInterfaceHandler;
use App\Repositories\Notices\NoticesRepositoryInterface;
use App\Repositories\Notices\NoticesRepositoryInterfaceHandler;
use App\Repositories\Page\PageRepositoryHandler;
use App\Repositories\Page\PageRepositoryInterface;
use App\Repositories\Publication\PublicationRepositoryInterface;
use App\Repositories\Publication\PublicationRepositoryInterfaceHandler;
use App\Repositories\Setting\SettingRepositoryInterface;
use App\Repositories\Setting\SettingRepositoryInterfaceHandler;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\User\UserRepositoryInterfaceHandler;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DonateRepositoryInterface::class, DonateRepositoryInterfaceHandler::class);
        $this->app->bind(PageRepositoryInterface::class, PageRepositoryHandler::class);
        $this->app->bind(SettingRepositoryInterface::class, SettingRepositoryInterfaceHandler::class);
        $this->app->bind(NoticesRepositoryInterface::class, NoticesRepositoryInterfaceHandler::class);
        $this->app->bind(GalleryRepositoryInterface::class, GalleryRepositoryInterfaceHandler::class);
        $this->app->bind(PublicationRepositoryInterface::class, PublicationRepositoryInterfaceHandler::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepositoryInterfaceHandler::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Inertia::share([
            'flash' => function () {
                return [
                    'message' => session('message'),
                    'error' => session('error'),
                ];
            },
        ]);
    }
}

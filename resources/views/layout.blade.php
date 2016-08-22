<!DOCTYPE html>
<html>
    <head>
        <title>Parts Ordering App</title>
            @include("_shared/fonts")
            @include("_shared/css")
            @yield('css')
            <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body class="hold-transition fixed skin-blue sidebar-mini">
        <div class="wrapper">
            <header class="main-header">
                @include("_shared/header")
            </header>
            <aside class="main-sidebar">
                @include("_shared/sidebar")
            </aside>
            <div class="content-wrapper">
                @yield('content')
            </div>
                @include("_shared/footer")
        </div>
    </body>
        @include("_shared/js")
        @yield('js')
</html>

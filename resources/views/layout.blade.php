<!DOCTYPE html>
<html>
    <head>
        <title>Parts Ordering App</title>
            @include("_shared/css")
            @yield('css')
    </head>
    <body class="hold-transition skin-blue sidebar-mini">
        <div class="wrapper">
            <header class="main-header">
                @include("_shared/header")
            </header>
            <aside class="main-sidebar">
                @include("_shared/sidebar")
            </aside>
            <div class="content-wrapper">
                <section class="content">
                    <div class="row">
                        @yield('content')
                    </div>
                </section>
            </div>
        </div>
    </body>
        @include("_shared/js")
        @yield('js')
</html>

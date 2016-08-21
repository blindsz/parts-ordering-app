<script type="text/javascript">
	var BASE_URL = "{{ URL::to('/') . "/" }}";
	var CURRENT_ROUTE = "{{ Route::getCurrentRoute()->getPath() }}";
	var _token = '{{ csrf_token() }}';
</script>

<!-- jQuery -->
<script type="text/javascript" src="{{{ asset('assets/js/jquery/jQuery-2.1.3.min.js') }}}"></script>
<script type="text/javascript" src="{{{ asset('assets/js/jquery/jQuery-Rest.js') }}}"></script>

<!-- slim scroll this is important! for fixed position of the sidebar and navbar --><!-- AdminLTE -->
<script type="text/javascript" src="{{{ asset('assets/js/slim_scroll/jquery.slimscroll.min.js') }}}"></script>
<script type="text/javascript" src="{{{ asset('assets/js/adminlte/app.min.js') }}}"></script>

<!-- Bootstrap -->
<script type="text/javascript" src="{{{ asset('assets/js/bootstrap/bootstrap.min.js') }}}"></script>

<!-- numeral -->
<script type="text/javascript" src="{{{ asset('assets/js/numeral/numeral.js') }}}"></script>

<!-- datatable -->
<script type="text/javascript" src="{{{ asset('assets/js/datatable/datatable_media/js/jquery.dataTables.js') }}}"></script>

<!-- datatable extensions -->
<script type="text/javascript" src="{{{ asset('assets/js/datatable/datatable_extensions/Scroller/js/dataTables.scroller.js') }}}"></script>
<script type="text/javascript" src="{{{ asset('assets/js/datatable/datatable_extensions/Responsive/js/dataTables.responsive.min.js') }}}"></script>
<script type="text/javascript" src="{{{ asset('assets/js/datatable/datatable_extensions/bootstrap_theme/dataTables.bootstrap.js') }}}"></script>
<script type="text/javascript" src="{{{ asset('assets/js/datatable/datatable_extensions/KeyTable/js/dataTables.keyTable.min.js') }}}"></script>

<!-- sweet alert -->
<script type="text/javascript" src="{{{ asset('assets/js/sweet_alert/sweet-alert.min.js') }}}"></script>
<script type="text/javascript" src="{{{ asset('assets/js/sweet_alert/alerts.js') }}}"></script>

<!-- choosen -->
<script type="text/javascript" src="{{{ asset('assets/js/choosen/chosen.jquery.min.js') }}}"></script>

<!-- X-editable -->
<script type="text/javascript" src="{{{ asset('assets/js/editable/jquery.jeditable.js') }}}"></script>

<!-- jquery validation -->
<script src="{{{ asset('assets/js/jquery_validate/jquery.validate.min.js') }}}"></script>
<script src="{{{ asset('assets/js/jquery_validate/additional-methods.min.js') }}}"></script>

<!-- Async -->
<script src="{{{ asset('assets/node_modules/async/dist/async.min.js') }}}"></script>

<!-- <script src="{{{ asset('assets/js/app/app.js') }}}"></script> -->

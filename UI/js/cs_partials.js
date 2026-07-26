$(document).ready(function () {
    //Alerts
    $.get("partials/alerts.html", function (data) {
        $("#lbs_alerts").html(data);
    });
    $.get("partials/alerts_c.html", function (data) {
        $("#data-alert-primary").html(data);
    });
    //lbs_badges
    $.get("partials/badges.html", function (data) {
        $("#lbs_badges").html(data);
    });
    $.get("partials/badges_c.html", function (data) {
        $("#c-badges").html(data);
    });
    //lbs_breadcrumbs
    $.get("partials/breadcrumbs.html", function (data) {
        $("#lbs_breadcrumbs").html(data);
    });
    $.get("partials/breadcrumbs_c.html", function (data) {
        $("#data-breadcrumb").html(data);
    });
    //lbs_buttons
    $.get("partials/buttons.html", function (data) {
        $("#lbs_buttons").html(data);
    }); 
    $.get("partials/buttons_c.html", function (data) {
        $("#c-buttons").html(data);
    }); 
    //lbs_button_groups
    $.get("partials/button_groups.html", function (data) {
        $("#lbs_button_groups").html(data);
    });
    $.get("partials/button_groups_c.html", function (data) {
        $("#c-btn-grp").html(data);
    });
    //lbs_button_modifiers
    $.get("partials/button_modifiers.html", function (data) {
        $("#lbs_button_modifiers").html(data);
    });
    $.get("partials/button_modifiers_c.html", function (data) {
        $("#c-button_modifiers").html(data);
    });
    //lbs_cards
    $.get("partials/cards.html", function (data) {
        $("#lbs_cards").html(data);
    });
    $.get("partials/cards_c.html", function (data) {
        $("#c-cards").html(data);
    });
    //lbs_carousel
    $.get("partials/carousel.html", function (data) {
        $("#lbs_carousel").html(data);
    });
    $.get("partials/carousel_c.html", function (data) {
        $("#c-carousel").html(data);
    });
    //lbs_collapse
    $.get("partials/collapse.html", function (data) {
        $("#lbs_collapse").html(data);
    });
    $.get("partials/collapse_c.html", function (data) {
        $("#c-collapse").html(data);
    });
    //lbs_dropdowns
    $.get("partials/dropdowns.html", function (data) {
        $("#lbs_dropdowns").html(data);
    });
    $.get("partials/dropdowns_c.html", function (data) {
        $("#c-dropdowns").html(data);
    });
    //lbs_forms
    $.get("partials/forms.html", function (data) {
        $("#lbs_forms").html(data);
    });
    $.get("partials/forms_c.html", function (data) {
        $("#c-forms").html(data);
    });
    //lbs_form_input
    $.get("partials/form_input.html", function (data) {
        $("#lbs_form_input").html(data);
    });
    $.get("partials/form_input_c.html", function (data) {
        $("#c-form_input").html(data);
    });
    //lbs_custom_forms
    $.get("partials/custom_forms.html", function (data) {
        $("#lbs_custom_forms").html(data);
    });
    $.get("partials/custom_forms_c.html", function (data) {
        $("#c-custom_forms").html(data);
    });
    //lbs_grid
    $.get("partials/grid.html", function (data) {
        $("#lbs_grid").html(data);
    });
    $.get("partials/grid_c.html", function (data) {
        $("#c-grid").html(data);
    });
    //lbs_images
    $.get("partials/images.html", function (data) {
        $("#lbs_images").html(data);
    });
    $.get("partials/images_c.html", function (data) {
        $("#c-images").html(data);
    });
    //lbs_jumbotron
    $.get("partials/jumbotron.html", function (data) {
        $("#lbs_jumbotron").html(data);
    });
    $.get("partials/jumbotron_c.html", function (data) {
        $("#c-jumbotron").html(data);
    });
    //lbs_list_group
    $.get("partials/list_group.html", function (data) {
        $("#lbs_list_group").html(data);
    });
    $.get("partials/list_group_c.html", function (data) {
        $("#c-list_group").html(data);
    });
    //lbs_media_objects
    $.get("partials/media_objects.html", function (data) {
        $("#lbs_media_objects").html(data);
    });
    $.get("partials/media_objects_c.html", function (data) {
        $("#c-media_objects").html(data);
    });
    //lbs_modal
    $.get("partials/modal.html", function (data) {
        $("#lbs_modal").html(data);
    }); 
    $.get("partials/model_part.html", function (data) {
        $("#c-model_part").html(data);
    });
    $.get("partials/modal_c.html", function (data) {
        $("#c-modal").html(data);
    });
    //lbs_navs
    $.get("partials/navs.html", function (data) {
        $("#lbs_navs").html(data);
    });
    $.get("partials/navs_c.html", function (data) {
        $("#c-navs").html(data);
    });
    //lbs_navbar
    $.get("partials/navbar.html", function (data) {
        $("#lbs_navbar").html(data);
    });
    $.get("partials/navbar_c.html", function (data) {
        $("#c-navbar").html(data);
    });
    //lbs_pagination
    $.get("partials/pagination.html", function (data) {
        $("#lbs_pagination").html(data);
    });
    $.get("partials/pagination_c.html", function (data) {
        $("#c-pagination").html(data);
    });
    //lbs_popover
    $.get("partials/popover.html", function (data) {
        $("#lbs_popover").html(data);
    });
    $.get("partials/popover_c.html", function (data) {
        $("#c-popover").html(data);
    });
    //lbs_scrollspy
    $.get("partials/scrollspy.html", function (data) {
        $("#lbs_scrollspy").html(data);
    });
    $.get("partials/scrollspy_c.html", function (data) {
        $("#data-data-spy").html(data);
    });
    //lbs_tables
    $.get("partials/tables.html", function (data) {
        $("#lbs_tables").html(data);
    });
    $.get("partials/tables_c.html", function (data) {
        $("#c-tables").html(data);
    });
    //lbs_tooltips
    $.get("partials/tooltips.html", function (data) {
        $("#lbs_tooltips").html(data);
    });
    $.get("partials/tooltips_c.html", function (data) {
        $("#data-tooltip").html(data);
    });
    //lbs_typography
    $.get("partials/typography.html", function (data) {
        $("#lbs_typography").html(data);
    });
    $.get("partials/typography_c.html", function (data) {
        $("#c-typography").html(data);
    });
    //lbs_u_borders
    $.get("partials/u_borders.html", function (data) {
        $("#lbs_u_borders").html(data);
    });
    $.get("partials/u_borders_c.html", function (data) {
        $("#c-u_borders").html(data);
    });
    //lbs_u_colors
    $.get("partials/u_colors.html", function (data) {
        $("#lbs_u_colors").html(data);
    });
    $.get("partials/u_colors_c.html", function (data) {
        $("#c-u_colors").html(data);
    });
    //lbs_u_display
    $.get("partials/u_display.html", function (data) {
        $("#lbs_u_display").html(data);
    });
    $.get("partials/u_display_c.html", function (data) {
        $("#c-u_display").html(data);
    });
    //lbs_u_flexbox
    $.get("partials/u_flexbox.html", function (data) {
        $("#lbs_u_flexbox").html(data);
    });
    $.get("partials/u_flexbox_c.html", function (data) {
        $("#c-u_flexbox").html(data);
    });
    //lbs_u_misc
    $.get("partials/u_misc.html", function (data) {
        $("#lbs_u_misc").html(data);
    });
    $.get("partials/u_misc_c.html", function (data) {
        $("#c-u_misc").html(data);
    });
    //lbs_u_positioning
    $.get("partials/u_positioning.html", function (data) {
        $("#lbs_u_positioning").html(data);
    });
    $.get("partials/u_positioning_c.html", function (data) {
        $("#c-u_positioning").html(data);
    });
    //lbs_u_sizing
    $.get("partials/u_sizing.html", function (data) {
        $("#lbs_u_sizing").html(data);
    });
    $.get("partials/u_sizing_c.html", function (data) {
        $("#c-u_sizing").html(data);
    });
    //lbs_u_spacing
    $.get("partials/u_spacing.html", function (data) {
        $("#lbs_u_spacing").html(data);
    });
    $.get("partials/u_spacing_c.html", function (data) {
        $("#c-u_spacing").html(data);
    });
    //lbs_u_text
    $.get("partials/u_text.html", function (data) {
        $("#lbs_u_text").html(data);
    });
    $.get("partials/u_text_c.html", function (data) {
        $("#c-u_text").html(data);
    });

    //lbs_sweet_alert
    $.get("partials/swim_alert.html", function (data) {
        $("#lbs_swim_alert").html(data);
    });
    $.get("partials/swim_alert_c.html", function (data) {
        $("#c-swim_alert").html(data);
    });
});

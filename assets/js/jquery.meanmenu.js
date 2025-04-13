/*!
* jQuery meanMenu v2.0.8
* @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
*
*/
/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
* HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
* FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
* OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
* COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
* BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
* DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://gnu.org/licenses/>.
*
* Find more information at http://www.meanthemes.com/plugins/meanmenu/
*
*/
(function ($) {
    "use strict";
    $.fn.meanmenu = function (options) {
        var defaults = {
            meanMenuTarget: jQuery(this),
            meanMenuContainer: '.mobile-menu-area',
            meanMenuClose: "X",
            meanMenuCloseSize: "18px",
            meanMenuOpen: "<span></span><span></span><span></span>",
            meanRevealPosition: "right",
            meanRevealPositionDistance: "0",
            meanRevealColour: "transparent",
            meanScreenWidth: "991",
            meanNavPush: "",
            meanShowChildren: true,
            meanExpandableChildren: true,
            meanExpand: "+",
            meanContract: "-",
            meanRemoveAttrs: false,
            onePage: false,
            meanDisplay: "block",
            removeElements: "",
            // Add callback for after menu creation
            afterCreate: function() {
                // Position the reveal button
                $('.meanmenu-reveal').css({
                    'position': 'absolute',
                    'right': '15px',
                    'top': '50%',
                    'transform': 'translateY(-50%)'
                });
                
                // Ensure header is visible
                $('.custom-mobile-header').show();
            }
        };
        options = $.extend(defaults, options);

        return this.each(function () {
            var meanMenu = options.meanMenuTarget;
            var meanContainer = options.meanMenuContainer;
            var currentWidth = window.innerWidth || document.documentElement.clientWidth;
            var menuOn = false;
            var meanMenuExist = false;

            function cleanUp() {
                $('.mean-push').remove();
                $(meanContainer).removeClass("mean-container");
                $(meanMenu).css('display', '');
                $('.mean-bar').hide();
                menuOn = false;
                meanMenuExist = false;
            }

            function createMenu() {
                cleanUp();
                
                if (currentWidth <= options.meanScreenWidth) {
                    $(meanContainer).addClass("mean-container");
                    $('.mean-bar').show();
                    
                    // Move menu contents
                    $('.mean-nav').html($(meanMenu).html());
                    $(meanMenu).hide();

                    // Initialize toggle functionality
                    $(".meanmenu-reveal").off("click").on("click", function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        $this.toggleClass("meanclose");
                        $('.mean-nav ul:first').stop().slideToggle(300, function() {
                            menuOn = $this.hasClass("meanclose");
                        });
                    });

                    // Handle submenus if enabled
                    if (options.meanShowChildren && options.meanExpandableChildren) {
                        $('.mean-nav ul ul').each(function() {
                            if ($(this).children().length) {
                                $(this).parent().append(
                                    `<a class="mean-expand" href="#" style="font-size: ${options.meanMenuCloseSize}">
                                        ${options.meanExpand}
                                    </a>`
                                );
                            }
                        });

                        $('.mean-nav').on('click', '.mean-expand', function(e) {
                            e.preventDefault();
                            var $this = $(this);
                            if ($this.hasClass("mean-clicked")) {
                                $this.text(options.meanExpand)
                                    .prev('ul').slideUp(300)
                                    .removeClass("mean-clicked");
                            } else {
                                $this.text(options.meanContract)
                                    .prev('ul').slideDown(300)
                                    .addClass("mean-clicked");
                            }
                        });
                    }

                    // Call afterCreate callback
                    if (typeof options.afterCreate === 'function') {
                        options.afterCreate();
                    }

                    meanMenuExist = true;
                }
            }

            // Initial setup
            createMenu();

            // Handle window resize
            $(window).resize(function() {
                currentWidth = window.innerWidth || document.documentElement.clientWidth;
                if (currentWidth <= options.meanScreenWidth && !meanMenuExist) {
                    createMenu();
                } else if (currentWidth > options.meanScreenWidth) {
                    cleanUp();
                }
            });
        });
    };
})(jQuery);

// Initialize
$(document).ready(function() {
    $('.hendre_menu').meanmenu();
});

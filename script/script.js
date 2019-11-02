$(function() {

    var $mist = $("#mist");
    var $container = $mist.next("#container");
    var $main = $container.children("#main");
    var $title = $main.children("div");
    var $page_1 = $container.children("#page_1");
    var $page_2 = $page_1.siblings("#page_2");
    var $page_3 = $page_1.siblings("#page_3");
    var $page_4 = $page_1.siblings("#page_4");
    var $wrap = $page_1.siblings("#page_4").children("#wrap");
    var $content = $page_1.children(".content");
    var $letter = $content.children(".letter");
    var $map = $page_1.children("#map");
    var $caution = $page_1.find(".caution")
    var $shell = $page_2.children("#shell");
    var $floating = $shell.next("#floating");
    var $shadow = $shell.next("#shadow");

    var currentX = 0;
    var currentY = 0;
    var movementConstant = 0.01;
    
    // 안개
    $mist.on("mousemove", function(e) {
        if (currentX == 0)
            currentX = e.pageX;
    
        var xDiff = e.pageX - currentX;
        currentX = e.pageX;
    
        if (currentY == 0)
            currentY = e.pageY;
    
        var yDiff = e.pageY - currentY;
        currentY = e.pageY;
    
        $mist.each(function(i, el) {
            var movementX = (i + 1) * (xDiff * movementConstant);
            var movementY = (i + 1) * (yDiff * movementConstant);
            var newX = $(el).position().left + movementX;
            var newY = $(el).position().top + movementY;
            $(el).css({ "left": newX + "px", "top": newY + "px" });

            // console.log("X: " + newX);
            // console.log("Y: " + newY);
        });
    });

    $page_3.children("div").children(".said_1").each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter_2'>$&</span>"));
    });

    $page_3.children("div").children(".said_2").each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter_3'>$&</span>"));
    });

    $letter.each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter_4'>$&</span>"));
    });

    // 쉘
    window.setInterval(function() {
        $shell.animate({ "margin-top": "4.5%" }, 1200, function() {
            $shell.animate({ "margin-top": "5.5%" }, 900, function() {
                $shell.animate({ "margin-top": "5%" }, 900);
            });
        });
    }, 5000);

    // 그림자
    window.setInterval(function() {
        $shadow.animate({ "width": "110px" }, 1200, function() {
            $shadow.animate({ "width": "95px" }, 900, function() {
                $shadow.animate({ "width": "100px" }, 900);
            });
        });
    }, 5000);

    var scrolled = $(window).width();
    var duration= 3000;

    // ARRIVAL
    $title.children("h1").each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter_1'>$&</span>"));
    });
      
      anime.timeline({loop: false})
        .add({
          targets: "h1 .letter_1",
          translateX: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 10000,
          delay: function(el, i) {
            return 800 + 400 * i;
          }
        });

    // page_1 지도
    window.setTimeout(function() {
        $("html, body").animate({ scrollLeft: scrolled }, duration);
        $main.children(":last").animate({ "left": "60%", "opacity": "0.5" }, 3000);
        window.setTimeout(function() {
            $page_1.children("h2").css({
                "display": "block",
                "animation": "typing 3.7s steps(15, end), blink-caret 0.55s step-end infinite"
            });
        }, 2000)
        window.setTimeout(function() {
            $map.fadeIn(800);
            $page_1.children("h2").animate({ "top": "80%" }, 800)
        }, 8000);
        $caution.each(function(index) {
            window.setTimeout(function() {
                $caution.eq(index).fadeIn(500).addClass("caution_on");
            }, 9300 + 200 * index);
        });
        window.setTimeout(function flicker() {
            $caution.animate({ "opacity": "0.3" }, 1500, function() {
                $caution.animate({ "opacity": "1" }, 1500, flicker());
            });
        }, 15000);
        window.setTimeout(function() {
            $page_1.children("h2").css({
                "animation": "erasing 1s steps(15, end), blink-caret 0.3s step-end infinite"
            });
            window.setTimeout(function() {
                $page_1.children("h2").empty();
            }, 990);
        }, 13000)
        window.setTimeout(function() {
            $content.eq(0).find(".letter_4").each(function(index) {
                $(this).css({
                    "transition": (index + 1) * 0.1 + "s",
                    "opacity": "1",
                    "transform": "rotateY( 0deg )"
                })
            });
        }, 15500);
        window.setTimeout(function() {
            $content.eq(1).find(".letter_4").each(function(index) {
                $(this).css({
                    "transition": (index + 1) * 0.1 + "s",
                    "opacity": "1",
                    "transform": "rotateY( 0deg )"
                })
            });
        }, 15000);
        window.setTimeout(function() {
            $content.eq(2).find(".letter_4").each(function(index) {
                $(this).css({
                    "transition": (index + 1) * 0.05 + "s",
                    "opacity": "1",
                    "transform": "rotateY( 0deg )"
                })
            });
        }, 14500);
    }, 8000);

    // page_2 쉘
    window.setTimeout(function() {
        $("html, body").animate({ scrollLeft: scrolled * 2 }, duration);
        window.setTimeout(function() {
            $floating.children("h3").each(function(index) {
                window.setTimeout(function() {
                    $floating.children("h3").eq(index).animate({
                        "font-size": "1.3rem",
                        "opacity": "1"
                    }, 900, function() {
                        $floating.children("h3").eq(index).animate({
                            "font-size": "1.2rem"
                        }, 600);
                    });
                }, 1000 + index * 1000);
            });
        }, 1000);
    }, 33000);

    // page_3 인물
    window.setTimeout(function() {
        $("html, body").animate({ scrollLeft: scrolled * 3 }, duration);
            $page_3.children("div").each(function(index) {
                $(this).animate({ "margin-top": "15px" }, 1500 + 1000 * index);
            });
            window.setTimeout(function() {
                $page_3.children("div").find(".letter_2").each(function(index) {
                    $(this).animate({ "top": 0, "opacity": "1" }, 200 + 100 * index, function() {
                        $page_3.children("div").find(".letter_3").each(function(index) {
                            $(this).animate({ "top": 0, "opacity": "1" }, 200 + 100 * index);
                        });
                    });
                });
            }, 2500);
            $page_3.find(".said_3").each(function(index) {
                window.setTimeout(function() {
                    $page_3.find(".said_3").eq(index).animate({ "opacity": "1" }, 1500);
                }, 3500 + 100 * index);
            });
    }, 44000);

    // page_4 크레딧
    window.setTimeout(function() {
        $("html, body").animate({ scrollLeft: scrolled * 4 }, duration);
        window.setTimeout(function() {
            $wrap.children("h3").css("animation", "switch 36s linear").each(function(index) {
                $wrap.children("h3").eq(index).css("animation-delay", index * 4 + "s");
            });
            $wrap.children("p").css({
                "animation": "switch_2 36s linear",
                "animation-delay": "28s"
            });
            $wrap.children("#logo").css({
                "animation": "switch_2 36s linear",
                "animation-delay": "32s"
            });
        }, 1500);
    }, 56000);

    // OUT
    window.setTimeout(function() {
        $page_4.fadeOut(3000);
        $mist.fadeOut(1500);
        window.setTimeout(function() {
            $container.children("div").css("display", "none");
        }, 4500);
    }, 95000);

}); // document.onready

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<wheel>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// if (window.addEventListener) {
    //     window.addEventListener("wheel",
    //         function (e) { e.preventDefault(); }, { passive: false });
    // }

    // var scrolling = false;
    // var page = 1;
    // $(window).on("wheel", function (e) {
    //     // console.log(e.originalEvent.deltaY);	// up: -100, down: 100

    //     if (e.originalEvent.deltaY < 0) {
            
    //         if (scrolling) return;

    //         console.log("up");
    //         left -= scrolled;

    //         if (page == 2)
    //             $main.children(":last").animate({ "left": 0 }, 3000);

    //         if (page == 1) {
    //             left = 0;
    //             console.log(left);
    //         }

    //         else {
    //             console.log(left);
    //             $("html, body").stop(true, false).animate({ scrollLeft: left }, duration, function() {
    //                 scrolling = false;
    //             });
    //             page--;
    //             console.log("page: " + page);
    //             scrolling = true;
    //         }
    //     }
        
    //     else {

    //         if (scrolling) return;

    //         console.log("down");
    //         left += scrolled;
        
    //         if (page == 1) {
    //             $main.children(":last").animate({ "left": "60%" }, 3000);
    //             window.setTimeout(function() {
    //                 $page_1.children("h2").css({
    //                     "display": "block",
    //                     "animation": "typing 3.7s steps(15, end), blink-caret 0.55s step-end infinite"
    //                 });
    //             }, 2000)
    //             window.setTimeout(function() {
    //                 $map.fadeIn(800);
    //                 $page_1.children("h2").animate({ "top": "80%" }, 800)
    //             }, 8000);
    //             $caution.each(function(index) {
    //                 window.setTimeout(function() {
    //                     $caution.eq(index).fadeIn(500).addClass("caution_on");
    //                 }, 9300 + 200 * index);
    //             });
    //             window.setTimeout(function flicker() {
    //                 $caution.animate({ "opacity": "0.3" }, 1500, function() {
    //                     $caution.animate({ "opacity": "1" }, 1500, flicker());
    //                 });
    //             }, 15000);
    //             window.setTimeout(function() {
    //                 $page_1.children("h2").css({
    //                     "animation": "erasing 1s steps(15, end), blink-caret 0.3s step-end infinite"
    //                 });
    //                 window.setTimeout(function() {
    //                     $page_1.children("h2").empty();
    //                 }, 990);
    //             }, 13000)
    //             window.setTimeout(function() {
    //                 $content.eq(0).find(".letter_4").each(function(index) {
    //                     $(this).css({
    //                         "transition": (index + 1) * 0.1 + "s",
    //                         "opacity": "1",
    //                         "transform": "rotateY( 0deg )"
    //                     })
    //                 });
    //             }, 15500);
    //             window.setTimeout(function() {
    //                 $content.eq(1).find(".letter_4").each(function(index) {
    //                     $(this).css({
    //                         "transition": (index + 1) * 0.1 + "s",
    //                         "opacity": "1",
    //                         "transform": "rotateY( 0deg )"
    //                     })
    //                 });
    //             }, 15000);
    //             window.setTimeout(function() {
    //                 $content.eq(2).find(".letter_4").each(function(index) {
    //                     $(this).css({
    //                         "transition": (index + 1) * 0.05 + "s",
    //                         "opacity": "1",
    //                         "transform": "rotateY( 0deg )"
    //                     })
    //                 });
    //             }, 14500);
    //         }

    //         if (page == 3) {
    //             $page_3.children("div").each(function(index) {
    //                 $(this).animate({ "margin-top": "15px" }, 1500 + 1000 * index);
    //             });
    //             window.setTimeout(function() {
    //                 $page_3.children("div").find(".letter_2").each(function(index) {
    //                     $(this).animate({ "top": 0, "opacity": "1" }, 200 + 100 * index, function() {
    //                         $page_3.children("div").find(".letter_3").each(function(index) {
    //                             $(this).animate({ "top": 0, "opacity": "1" }, 200 + 100 * index);
    //                         });
    //                     });
    //                 });
    //             }, 2500);
    //             $page_3.find(".said_3").each(function(index) {
    //                 window.setTimeout(function() {
    //                     $page_3.find(".said_3").eq(index).animate({ "opacity": "1" }, 1500);
    //                 }, 3500 + 100 * index);
    //             });
    //         }

    //         if (page == 4) {
    //             window.setTimeout(function() {
    //                 $wrap.children("h3").css("animation", "switch 36s linear").each(function(index) {
    //                     $wrap.children("h3").eq(index).css("animation-delay", index * 4 + "s");
    //                 });
    //                 $wrap.children("p").css({
    //                     "animation": "switch_2 36s linear",
    //                     "animation-delay": "28s"
    //                 });
    //                 $wrap.children("#logo").css({
    //                     "animation": "switch_2 36s linear",
    //                     "animation-delay": "32s"
    //                 });
    //             }, 2800);
    //         }

    //         if (page == 5) {
    //             left = $container.width() - scrolled;
    //             console.log(left);
    //         }
            
    //         else {
    //             console.log(left);
    //             $("html, body").stop(true, false).animate({ scrollLeft: left }, duration, function() {
    //                 scrolling = false;
    //             });
    //             page++;
    //             console.log("page: " + page);
    //             scrolling = true;
    //         }
    //     }
    // });
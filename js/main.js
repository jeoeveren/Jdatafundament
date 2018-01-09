function main() {
  'use strict';
  console.log(Date());

  $.getJSON('//ip-api.com/json?callback=?', function(data) {
    console.log(JSON.stringify(data, null, 2));
  });
      
  $.getJSON('//ipinfo.io/json', function(data) {
    console.log(JSON.stringify(data, null, 2));
  });

  var count = 0;
  $("a").each(function(index) {
    var $thisLnk = $(this);
    var count = 0;
    $thisLnk.click(function() {
      count++;
      console.log("aantal clicks: " + count);
      console.log($thisLnk.context);
      console.log(Date());
    });
  });

/* 
  Manage a menu structure with 2 underlying levels starting from level 0 (parent).
*/
  $('.menu-level-0-item').each(function() {
    var $thisFirstMenu = $(this);
    var toggleFirstMenu = false;
    var toggleSecondMenu = false;

/*
  Hide the underlying menu items on level 1 and 2 (children and possible their children).
*/
    $thisFirstMenu.next().find('.menu-level-1-item').hide();
    $thisFirstMenu.next().find('.menu-level-2-item').hide();
    $thisFirstMenu.next().find('.menu-level-3-item').hide();

/*
  For each item in the menu a click event is created.
*/
    $thisFirstMenu.click(function() {
      $thisFirstMenu.toggleClass('pulse-item');

/* 
  On click the next level will be shown or will be closed.
*/
      $thisFirstMenu.next().find('.menu-level-1-item').each(function() {
        $(this).slideToggle(800);

/*  
  On a close event also the children on all levels need to be closed.
*/
        if (toggleFirstMenu) {
          
          $(this).next().find('.menu-level-2-item').each(function() {
            var itemStatus = $(this).is(':hidden') ? 'hidden' : 'visible';
/*  
  Visible items on the next level also need to become hidden items.
*/
            if (itemStatus === 'visible') {
              $(this).slideToggle(800);
            }
            
            $(this).next().find('.menu-level-3-item').each(function() {
              var itemStatus = $(this).is(':hidden') ? 'hidden' : 'visible';
/*  
  Visible items on the next level also need to become hidden items.
*/
              if (itemStatus === 'visible') {
                $(this).slideToggle(800);
              }
            });
          });
        }
      });
/*
  A variable that indicates the open/close status for the menu and changes on a click event.
*/   
      if (toggleFirstMenu) {
        toggleFirstMenu = false;
      } else {
        toggleFirstMenu = true;
      }
    });

/*
  For each item in the sub-menu a click event is created.
*/
    $thisFirstMenu.next().find('.menu-level-1-item').each(function() {
      var $thisSecondMenu = $(this);

      console.log($(this));
/*
      var div = document.getElementById($(this).text());
          div.style.display = 'none';
          document.getElementById($thisFirstMenu.text()).style.display = 'block';
*/

      
/*
  For each item in the menu a click event is created.
*/
      $thisSecondMenu.click(function() {

/* 
  On click the next level will be shown or will be closed.
*/
        $thisSecondMenu.next().find('.menu-level-2-item').each(function() {
          $(this).slideToggle(800);

          if (toggleSecondMenu) {

            $(this).next().find('.menu-level-3-item').each(function() {
              var itemStatus = $(this).is(':hidden') ? 'hidden' : 'visible';
/*  
  Visible items on the last level also need to be hidden items.
*/
              if (itemStatus === 'visible') {
                $(this).slideToggle(800);
              }
            });
          }
        });
/*
  A variable that indicates the open/close status for the menu and changes on a click event.
*/   
        if (toggleSecondMenu) {
          toggleSecondMenu = false;
        } else {
          toggleSecondMenu = true;
        }
      });
    });

    /*
      For each item in the sub-menu a click event is created.
    */
    $thisFirstMenu.next().find('.menu-level-2-item').each(function() {
      var $thisThirdMenu = $(this);
      /*
        For each item in the menu a click event is created.
      */
      $thisThirdMenu.click(function() {
        /* 
          On click the next level will be shown or will be closed.
        */
        $thisThirdMenu.next().find('.menu-level-3-item').each(function() {
          $(this).slideToggle(800);
        });
      });
    });

  });

  $('.toggle-menu').on('click', function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('hide');
    $('#page-content').toggleClass('see');
    $('.toggle-menu').find('span').closest('.glyphicon').toggleClass('glyphicon glyphicon-list glyphicon glyphicon-align-justify');
  });

};

$(document).ready(main);


/*        
        $thisFirstMenu.next().find('.menu-level-1-item').each(function() {
          var div = document.getElementById($(this).text());
          div.style.display = 'none';
          document.getElementById($thisSecondMenu.text()).style.display = 'block';
        });
*/
      

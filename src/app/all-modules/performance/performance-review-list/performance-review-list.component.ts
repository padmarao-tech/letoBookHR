import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-performance-review-list',
  templateUrl: './performance-review-list.component.html',
})
export class PerformanceReviewListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function(){
      //First Row Datatable Grid status 
      $(".comShowDrop").hide(); 
      $(".penShowHide").hide();
      $(".payslip-print").prop('disabled', true);
      $(".payslip-print2").prop('disabled', true);
      $(".payslip-print3").prop('disabled', true);
      $(".comShowHide").click(function(){
        $(".comShowDrop").show();
        $(".penShowHide").show();
        $(".penShowHideDrop").hide();
        $(".payslip-print").prop('disabled', false);
      });

       
      $(".comShowDrop").click(function(){
          $(".comShowHide").show(); 
          $(".penShowHide").show(); 
          $(".payslip-print").prop('disabled', false);
      });

      $(".penShowHideDrop").click(function(){
        $(".comShowHide").show(); 
        $(".penShowHide").show(); 
        $(".payslip-print").prop('disabled', true);
      });

      $(".penShowHide").click(function(){
        $(".comShowDrop").hide();
        $(".penShowHide").show();
        $(".penShowHideDrop").show();
        $(".payslip-print").prop('disabled', true);
      });
      // First Row td End

      // Second Row td
      $(".comShowDrop2").hide(); 
      $(".penShowHide2").hide();
      
      $(".comShowHide2").click(function(){
        $(".comShowDrop2").show();
        $(".penShowHide2").show();
        $(".penShowHideDrop2").hide();
        $(".payslip-print2").prop('disabled', false);
      });

       
      $(".comShowDrop2").click(function(){
          $(".comShowHide2").show(); 
          $(".penShowHide2").show(); 
          $(".payslip-print2").prop('disabled', false);
      });

      $(".penShowHideDrop2").click(function(){
        $(".comShowHide2").show(); 
        $(".penShowHide2").show(); 
        $(".payslip-print2").prop('disabled', true);
      });

      $(".penShowHide2").click(function(){
        $(".comShowDrop2").hide();
        $(".penShowHide2").show();
        $(".penShowHideDrop2").show();
        $(".payslip-print2").prop('disabled', true);
      });
      // Second Row td End

      // Third Row td
      $(".comShowDrop3").hide(); 
      $(".penShowHide3").hide();
      
      $(".comShowHide3").click(function(){
        $(".comShowDrop3").show();
        $(".penShowHide3").show();
        $(".penShowHideDrop3").hide();
        $(".payslip-print3").prop('disabled', false);
      });

       
      $(".comShowDrop3").click(function(){
          $(".comShowHide3").show(); 
          $(".penShowHide3").show(); 
          $(".payslip-print3").prop('disabled', false);
      });

      $(".penShowHideDrop3").click(function(){
        $(".comShowHide3").show(); 
        $(".penShowHide3").show(); 
        $(".payslip-print3").prop('disabled', true);
      });

      $(".penShowHide3").click(function(){
        $(".comShowDrop3").hide();
        $(".penShowHide3").show();
        $(".penShowHideDrop3").show();
        $(".payslip-print3").prop('disabled', true);
      });
      // Third Row td End

      //this html is hide  
      // $(".penShowHide").show();
      //   $(".payslip-print").prop('disabled', true);
      //   $(".payslip-print2").prop('disabled', true);

      //   $(".penShowHide").click(function(){
      //       $(".penShowHide").show();  
      //   });

      //   $(".comShowHide").click(function(){
      //       $(".payslip-print").prop('disabled', false);
      //   });

      //   $(".penShowHide2").click(function(){
      //       $(".penShowHide2").show();  
      //   });

      //   $(".comShowHide2").click(function(){
      //       $(".payslip-print2").prop('disabled', false);
      //   });

      //   $(".comShowCancel").click(function(){
      //       $(".penShowHide").show();  
      //       $(".comShowHide").hide(); 
      //       $(".payslip-print").prop('disabled', true);
      //   });
      //   $(".comShowCancel2").click(function(){
      //       $(".penShowHide2").show();  
      //       $(".comShowHide2").hide(); 
      //       $(".payslip-print2").prop('disabled', true);
      //   });

      //   $(".comShow2").hide();
      //   $(".comShowCancel2").hide();

      //   $(".comShow").click(function(){
      //       $(".comShow2").hide();
      //       $(".comShowHide").show();
      //       $(".penShowHide").hide();
      //       $(".payslip-print").prop('disabled', false);
      //   });

      //   $(".comShow2").click(function(){
      //       $(".comShow").hide();
      //       $(".comShowHide2").show();
      //       $(".penShowHide2").hide();
      //       $(".payslip-print2").prop('disabled', false);
      // });

        //payslip model hide
        $(".payslip-modelHide").click(function(){
            $(".modal-backdrop.show").hide();
            //$(".page-wrapper").css("overflow-y" , "scroll");
        });

        
    });
  }

}

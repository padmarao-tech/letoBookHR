import { Component, OnInit ,  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { isValid } from 'date-fns';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


declare const $: any;
@Component({
  // selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  public addTaskForm: FormGroup;
  items = [''];
  taskitems = [''];
  dueDate = [''];
  disCrip =[''];
  // assign =[''];
  taskName =[''];
  newTaskSplitBox =[''];
  newProject =['IOS Application'];


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  addNewItem(value: string) {
    //this.newItemEvent.emit(value);
    this.items.push(value);
  }
  addNewDate(value: string) {
    this.dueDate.push(value);
  }
  addNewDis(value: string) {
    this.disCrip.push(value);
  }
  // addNewAssign(value: string) {
  //   this.assign.push(value);
  // }
  addNewTask(value: string) {
    this.taskName.push(value);
  }
  addValueGet(value: string) {
    this.newProject.push(value);
  }
  addTaskBox(value: string) {
    this.taskitems.push(value);
  }
  
  // addItem(newItem: string) {
  //   this.items.push(newItem);
    
  // }
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    $(document).ready(function () {

      var notificationTimeout;

      //Shows updated notification popup 
      var updateNotification = function (task, notificationText, newClass) {
        var notificationPopup = $('.notification-popup ');
        notificationPopup.find('.task').text(task);
        notificationPopup.find('.notification-text').text(notificationText);
        notificationPopup.removeClass('hide success');
        // If a custom class is provided for the popup, add It
        if (newClass)
          notificationPopup.addClass(newClass);
        // If there is already a timeout running for hiding current popup, clear it.
        if (notificationTimeout)
          clearTimeout(notificationTimeout);
        // Init timeout for hiding popup after 3 seconds
        notificationTimeout = setTimeout(function () {
          notificationPopup.addClass('hide');
        }, 3000);
      };

      // Adds a new Task to the todo list 
      var addTask = function () {
        // Get the new task entered by user
        var newTask = $('#new-task').val();
        // If new task is blank show error message
        if (newTask === '') {
          $('#new-task').addClass('error');
          $('.new-task-wrapper .error-message').removeClass('hidden');
        }
        else {
          var todoListScrollHeight = $('.task-list-body').prop('scrollHeight');
          // Make a new task template
          var newTemplate = $(taskTemplate).clone();
          // update the task label in the new template
          newTemplate.find('.task-label').text(`${newTask}`);
          // Add new class to the template
          newTemplate.addClass('new');
          // Remove complete class in the new Template in case it is present
          newTemplate.removeClass('completed');
          //Append the new template to todo list
          $('#task-list').append(newTemplate);
          // Clear the text in textarea
          $('#new-task').val('');
          // As a new task is added, hide the mark all tasks as incomplete button & show the mark all finished button
          $('#mark-all-finished').removeClass('move-up');
          $('#mark-all-incomplete').addClass('move-down');
          // Show notification
          updateNotification(newTask, 'added to list', "");
          // Smoothly scroll the todo list to the end
          $('.task-list-body').animate({ scrollTop: todoListScrollHeight }, 1000);
        }
      };

      // Closes the panel for entering new tasks & shows the button for opening the panel
      var closeNewTaskPanel = function () {
        $('.add-task-btn').toggleClass('visible');
        $('.new-task-wrapper').toggleClass('visible');
        if ($('#new-task').hasClass('error')) {
          $('#new-task').removeClass('error');
          $('.new-task-wrapper .error-message').addClass('hidden');
        }
      };

      // Initalizes HTML template for a given task 
      //var taskTemplate = $($('#task-template').html());
      var taskTemplate = '<li class="task"><div class="task-container"><span class="task-action-btn task-check"><span class="action-circle large complete-btn" title="Mark Complete"><i class="material-icons">check</i></span></span><span class="task-label" contenteditable="true"></span><span class="task-action-btn task-btn-right"><span class="action-circle large" title="Assign"><i class="material-icons">person_add</i></span> <span class="action-circle large delete-btn" title="Delete Task"><i class="material-icons">delete</i></span></span></div></li>';
      // Shows panel for entering new tasks
      $('.add-task-btn').click(function () {
        var newTaskWrapperOffset = $('.new-task-wrapper').offset().top;
        $(this).toggleClass('visible');
        $('.new-task-wrapper').toggleClass('visible');
        // Focus on the text area for typing in new task
        $('#new-task').focus();
        // Smoothly scroll to the text area to bring the text are in view
        $('body').animate({
          scrollTop: newTaskWrapperOffset
        }, 1000);
      });

      // Deletes task on click of delete button
      $('#task-list').on('click', '.task-action-btn .delete-btn', function () {
        var task = $(this).closest('.task');
        var taskText = task.find('.task-label').text();
        task.remove();
        updateNotification(taskText, ' has been deleted.', "");
      });

      // Marks a task as complete
      $('#task-list').on('click', '.task-action-btn .complete-btn', function () {
        var task = $(this).closest('.task');
        var taskText = task.find('.task-label').text();
        var newTitle = task.hasClass('completed') ? 'Mark Complete' : 'Mark Incomplete';
        $(this).attr('title', newTitle);
        task.hasClass('completed') ? updateNotification(taskText, 'marked as Incomplete.', '') : updateNotification(taskText, ' marked as complete.', 'success');
        task.toggleClass('completed');
      });

      // Adds a task on hitting Enter key, hides the panel for entering new task on hitting Esc. key
      $('#new-task').keydown(function (event) {
        // Get the code of the key that is pressed
        var keyCode = event.keyCode;
        var enterKeyCode = 13;
        var escapeKeyCode = 27;
        // If error message is already displayed, hide it.
        if ($('#new-task').hasClass('error')) {
          $('#new-task').removeClass('error');
          $('.new-task-wrapper .error-message').addClass('hidden');
        }
        // If key code is that of Enter Key then call addTask Function
        if (keyCode == enterKeyCode) {
          event.preventDefault();
          addTask();
        }
        // If key code is that of Esc Key then call closeNewTaskPanel Function
        else if (keyCode == escapeKeyCode)
          closeNewTaskPanel();

      });

      // Add new task on click of add task button
      $('#add-task').click(addTask);

      // Close new task panel on click of close panel button
      $('#close-task-panel').click(closeNewTaskPanel);

      // Mark all tasks as complete on click of mark all finished button
      $('#mark-all-finished').click(function () {
        $('#task-list .task').addClass('completed');
        $('#mark-all-incomplete').removeClass('move-down');
        $(this).addClass('move-up');
        updateNotification('All tasks', 'marked as complete.', 'success');
      });

      // Mark all tasks as incomplete on click of mark all incomplete button
      $('#mark-all-incomplete').click(function () {
        $('#task-list .task').removeClass('completed');
        $(this).addClass('move-down');
        $('#mark-all-finished').removeClass('move-up');
        updateNotification('All tasks', 'marked as Incomplete.', "");
      });

      // Task Complete
      $(document).on('click', '#task_complete', function () {
        $(this).toggleClass('task-completed');
        return false;
      });
     
        //First Row Datatable Grid status 
        // $(".comShowDrop").hide(); 
        // $(".penShowHide").hide();
        
        // $(".comShowHide").click(function(){
        //   $(".comShowDrop").show();
        //   $(".penShowHide").show();
        //   $(".penShowHideDrop").hide();
          
        // });
  
         
        // $(".comShowDrop").click(function(){
        //     $(".comShowHide").show(); 
        //     $(".penShowHide").show(); 
            
        // });
  
        // $(".penShowHideDrop").click(function(){
        //   $(".comShowHide").show(); 
        //   $(".penShowHide").show(); 
          
        // });
  
        // $(".penShowHide").click(function(){
        //   $(".comShowDrop").hide();
        //   $(".penShowHide").show();
        //   $(".penShowHideDrop").show();
          
        // });
        // First Row tr End

        // Second Row tr
        //First Row Datatable Grid status 
        // $(".comShowDrop2").hide(); 
        // $(".penShowHide2").hide();
        
        // $(".comShowHide2").click(function(){
        //   $(".comShowDrop2").show();
        //   $(".penShowHide2").show();
        //   $(".penShowHideDrop2").hide();
          
        // });
  
         
        // $(".comShowDrop2").click(function(){
        //     $(".comShowHide2").show(); 
        //     $(".penShowHide2").show(); 
            
        // });
  
        // $(".penShowHideDrop2").click(function(){
        //   $(".comShowHide2").show(); 
        //   $(".penShowHide2").show(); 
          
        // });
  
        // $(".penShowHide2").click(function(){
        //   $(".comShowDrop2").hide();
        //   $(".penShowHide2").show();
        //   $(".penShowHideDrop2").show();
          
        // });
        // Second row Tr End


        // Third Row tr
        //First Row Datatable Grid status 
        // $(".comShowDrop3").hide(); 
        // $(".penShowHide3").hide();
        
        // $(".comShowHide3").click(function(){
        //   $(".comShowDrop3").show();
        //   $(".penShowHide3").show();
        //   $(".penShowHideDrop3").hide();
          
        // });
  
         
        // $(".comShowDrop3").click(function(){
        //     $(".comShowHide3").show(); 
        //     $(".penShowHide3").show(); 
            
        // });
  
        // $(".penShowHideDrop3").click(function(){
        //   $(".comShowHide3").show(); 
        //   $(".penShowHide3").show(); 
          
        // });
  
        // $(".penShowHide3").click(function(){
        //   $(".comShowDrop3").hide();
        //   $(".penShowHide3").show();
        //   $(".penShowHideDrop3").show();
          
        // });
        // Third row Tr End

        // Forth Row tr
        //First Row Datatable Grid status 
        // $(".comShowDrop4").hide(); 
        // $(".penShowHide4").hide();
       
        // $(".comShowHide4").click(function(){
        //   $(".comShowDrop4").show();
        //   $(".penShowHide4").show();
        //   $(".penShowHideDrop4").hide();
         
        // });
  
         
        // $(".comShowDrop4").click(function(){
        //     $(".comShowHide4").show(); 
        //     $(".penShowHide4").show(); 
            
        // });
  
        // $(".penShowHideDrop4").click(function(){
        //   $(".comShowHide4").show(); 
        //   $(".penShowHide4").show(); 
          
        // });
  
        // $(".penShowHide4").click(function(){
        //   $(".comShowDrop4").hide();
        //   $(".penShowHide4").show();
        //   $(".penShowHideDrop4").show();
          
        // });
        // Forth row Tr End


        $(".letoProject").click(function(){
          $(".leto-form").show();
        });

    });
  }
  Onsubmit() {
    $("#create_project").modal("hide");
  }

}

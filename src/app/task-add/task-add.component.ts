import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';
import { ProjService } from '../service/proj.service';
import { User } from '../user/user.component';
import { UserService } from '../service/user.service';
import { Project } from '../proj/proj.component';
import { ParentTaskService } from '../service/parent-task.service';
import { TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

export class ParentTask {
  constructor(public parentTaskId: number, public name: string) {}
}

export class Task {
  constructor(public taskId: number, public userId: number, public parentTaskId: number, public projectId: number, public name: string, public startDate: Date, public endDate: Date, public priority: number, public status: boolean) {}
}

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  addOrUpdateButtonText: string = 'Add';

  projectId: number;
  project: Project;
  projects: Project[];

  taskId: number;
  task: Task;
  isParentTask: boolean;

  parentTaskId: number;
  parentTask: ParentTask;
  parentTasks: ParentTask[];

  userId: number;
  user: User;
  users: User[];

  isStartDateError: boolean;
  isEndDateError: boolean;

  constructor(private projService: ProjService, private parentTaskService: ParentTaskService, private taskService: TaskService, private userService: UserService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    console.log(`TaskAddComponent - ngOnInit`);
    this.refreshFields();
    this.refreshProjects();
    this.refreshParentTasks()
    this.refreshUsers();
    if (undefined !== this.route.snapshot.params['editTaskId']) {
      this.addOrUpdateButtonText = 'Update';
      this.projectId = this.route.snapshot.params['editProjectId'];
      this.taskId = this.route.snapshot.params['editTaskId'];
      this.taskService.retrieveTask(this.projectId, this.taskId).subscribe(
        response => {
          this.task = response;
          this.userId = this.task.userId;
          this.projectId = this.task.projectId;
          this.parentTaskId = this.task.parentTaskId;
        }
      );
    }
  }

  validtateDates() {
    this.isStartDateError = false;
    this.isEndDateError = false;
    if (new Date(this.task.startDate) < new Date()) {
      this.isStartDateError = true;
    }
    if (new Date(this.task.endDate) <= new Date() || new Date(this.task.endDate) < new Date(this.task.startDate)) {
      this.isEndDateError = true;
    }
  }

  pickProjectId() : void {
    console.log(`pickProjectId: ${this.projectId}`);
  }

  pickParentTaskId() : void {
    console.log(`pickParentTaskId: ${this.parentTaskId}`);
  }

  pickUserId() : void {
    console.log(`pickUserId: ${this.userId}`);
  }

  isParentTaskFlipped() : void {
    console.log(`isParentTaskFlipped: before ${this.isParentTaskFlipped}`);
    this.isParentTask != this.isParentTask;
  }

  resetForm() : void {
    console.log(`Reset form...`);
    this.refreshFields();
    this.refreshProjects();
    this.refreshParentTasks();
    this.refreshUsers();
  }

  addParentTask() : void {
    this.parentTask = new ParentTask(this.task.taskId, this.task.name);
    if (this.parentTask.parentTaskId === 0) {
      console.log(`ParentTask Add: ${this.parentTask}`);
      this.parentTaskService.addParentTask(this.parentTask).subscribe(
        response => {
          this.refreshFields();
          this.refreshProjects();
          this.refreshParentTasks();
          this.refreshUsers();
        }
      )  
    } else {
      console.log(`ParentTask Edit: ${this.task}`);
      this.addOrUpdateButtonText = 'Add';
      this.parentTaskService.editParentTask(this.parentTask.parentTaskId, this.parentTask).subscribe(
        response => {
          this.refreshFields();
          this.refreshProjects();
          this.refreshParentTasks();
          this.refreshUsers();
        }
      )  
    }
    console.log(`ParentTask Add/Edit - Sent request to service`);
  }

  addTask() : void {
    if (this.isParentTask) {
      console.log(`Parent Task`);
      this.addParentTask();
    } else {
      this.task.userId = this.userId;
      this.task.projectId = this.projectId;
      this.task.parentTaskId = this.parentTaskId;
      if (this.task.taskId === 0) {
        console.log(`Task Add: ${this.task}`);
        this.taskService.addTask(this.task).subscribe(
          response => {
            this.refreshFields();
            this.refreshProjects();
            this.refreshParentTasks();
            this.refreshUsers();
          }
        )  
      } else {
        console.log(`Task Edit: ${this.task}`);
        this.addOrUpdateButtonText = 'Add';
        this.taskService.editTask(this.task.taskId, this.task).subscribe(
          response => {
            this.refreshFields();
            this.refreshProjects();
            this.refreshParentTasks();
            this.refreshUsers();
          }
        )  
      }
      console.log(`Task Add/Edit - Sent request to service`);
    }
  }

  editTask(taskId: number) : void {
    console.log(`Edit Task: ${taskId}`);
    console.log(`Edit Task: Not used... use add() instead`);
  }

  refreshFields() : void {
    this.task = new Task(0,0,0,0,'',new Date(), new Date(), 0, false);
    this.isParentTask = false;
    this.addOrUpdateButtonText = 'Add';
  }

  refreshProjects() : void {
    this.projectId = 0;
    this.project =  new Project(0,null,0,null, null, 0, false);
    this.projService.retrieveAllProjects().subscribe(
      response => {
        console.log(`Projects from service: ${response}`);
        this.projects = response;
      }
    )
  }

  refreshParentTasks() : void {
    this.parentTaskId = 0;
    this.parentTask =  new ParentTask(0,null);
    this.parentTaskService.retrieveAllParentTasks().subscribe(
      response => {
        console.log(`ParentTasks from service: ${response}`);
        this.parentTasks = response;
      }
    )
  }

  refreshUsers() : void {
    this.userId = 0;
    this.user = new User(0,0,'','');
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(`Users from service: ${response}`);
        this.users = response;
      }
    )
  }

}

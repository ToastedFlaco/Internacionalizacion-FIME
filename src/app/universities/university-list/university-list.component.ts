import { Component, OnInit, ViewChild } from '@angular/core';
import { UniversityService } from 'src/app/shared/university.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UniversityComponent } from '../university/university.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent implements OnInit {

  constructor(public service: UniversityService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'country', 'career', 'agreement', 'curriculum', 'webpage', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getUniversities().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "100%";
    this.dialog.open(UniversityComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "100%";
    this.dialog.open(UniversityComponent, dialogConfig);
  }

  onDelete($key) {
    // if(confirm('Are you sure to delete this information?')){
    //   this.service.deleteUniversity($key);
    //   this.notificationService.warn('Information deleted');
    // }

    this.dialogService.openConfirmDialog().afterClosed().subscribe(res =>{
    if (res) {
      this.service.deleteUniversity($key);
      this.notificationService.warn('Information deleted');
      } 
    });
  }

}

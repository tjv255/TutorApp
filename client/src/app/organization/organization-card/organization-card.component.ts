import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/job';
import { Member } from 'src/app/_models/member';
import { Organization } from 'src/app/_models/organization';
import { orgLike } from 'src/app/_models/orgLike';
import { Pagination } from 'src/app/_models/pagination';
import { JobsService } from 'src/app/_services/jobs.service';
import { MembersService } from 'src/app/_services/members.service';
import { OrganizationsService } from 'src/app/_services/organizations.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.css']
})
export class OrganizationCardComponent implements OnInit {
  @Input() org: Organization;
  orgs: orgLike[];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private membersService: MembersService, private orgsService: OrganizationsService, private toastr: ToastrService, 
    public presence: PresenceService) { 

    }

  ngOnInit(): void {
    this.orgsService.getLikes( this.pageNumber, this.pageSize).subscribe(response => {
     this.orgs = response.result;
     this.pagination = response.pagination;
  })}

  addLike(org: Organization) {
    this.orgsService.addLike(org.id).subscribe(() => {
      this.toastr.success('You have liked ' + org.name);

    })
  }

  currMemUp()
  {
    this.membersService.getMember(this.membersService.currMem.username).subscribe(member =>{
      this.membersService.currMem = member;
      });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/job';
import { Member } from 'src/app/_models/member';
import { Organization } from 'src/app/_models/organization';
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

  constructor(private orgsServices: OrganizationsService, private toastr: ToastrService, 
    public presence: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(org: Organization) {
    this.orgsServices.addLike(org.name).subscribe(() => {
      this.toastr.success('You have liked ' + org.name);
    })
  }

}

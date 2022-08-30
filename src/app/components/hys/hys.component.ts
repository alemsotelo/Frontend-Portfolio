import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  skillsList: HysComponent[] = [];
  isLogged = false;

  skillForm: FormGroup;
  id: any;
  skillsL: any;
  nombreS: any;
  imgS: any;

  constructor(
    private skillsService: SkillsService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {this.skillForm = this.fb.group({
    id:[''],
    skillsLevel:['',[Validators.required]],
    nombreSkill:['',[Validators.required]]
  });

   }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.reloadData();
  }
  private reloadData() {
    this.skillsService.get().subscribe((data) => {
      this.skillsList = data;
    });
  }
  
  private clearForm() {
    this.skillForm.setValue({
      id:'',
      skillsL:'',
      nombreS:'',
      imgS:''
    });
  }
  
  private loadForm(skills: HysComponent) {
    this.skillForm.setValue({
      id: skills.id,
     skillsL: skills.skillsL,
     nombreS: skills.nombreS,
      imgS: skills.imgS
    });
  }
  onSubmit() {
    console.log(this.skillForm.value);
   let skills: HysComponent = this.skillForm.value;
   if (this.skillForm.get('id')?.value == '') {
     this.skillsService.save(skills).subscribe(
      (nuevaskills:HysComponent) => {
         this.skillsList.push(nuevaskills);
         this.reloadData();
         this.onNew()
       });
   } else {
    this.skillsService.save(skills).subscribe(
       (data) => {
         this.reloadData();
       },
       (err) => {
         alert('Falló');
       }
     );
   }
  }
  
  onNew() {
    this.clearForm();
  }
  onEdit(index: number) {
    let skills: HysComponent = this.skillsList[index];
    this.loadForm(skills);
  }
  onDelete(index: number) {
    let skills: HysComponent = this.skillsList[index];
    if (confirm('¿Está seguro que desea borrar?')) {
      this.skillsService.delete(skills.id).subscribe(() => {
        this.reloadData();
      });
    }
  }

}

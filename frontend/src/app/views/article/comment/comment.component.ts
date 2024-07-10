import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CommentType} from "../../../../types/comments-response.type";
import {AuthService} from "../../../core/auth/auth.service";
import {ReactionEnum} from "../../../../types/reaction.enum";
import {CommentsService} from "../../../shared/services/comments.service";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {ReactionsType} from "../../../../types/reactions.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
@Input() comment!: CommentType ;

@Output() addToReactionEvent: EventEmitter<{commentId: string, reaction :ReactionEnum | null}> = new EventEmitter<{commentId: string, reaction :ReactionEnum | null}>();

  userIsLoggedIn: boolean;
  userReaction: ReactionEnum | null = null
  reactionEnum = ReactionEnum;
  constructor(private authService: AuthService, private commentsService: CommentsService, private snackBar: SnackBarService,) {
    this.userIsLoggedIn = this.authService.getIsLoggedIn();

  }

  ngOnInit(): void {
    if (this.userIsLoggedIn) {
      this.commentsService.getReactionForComment(this.comment.id)
        .subscribe({
          next: (data) => {
            if ((data as DefaultResponseType).error) {
              throw new Error((data as DefaultResponseType).message)
            }
            if (data && (data as ReactionsType[]).length > 0) {
              this.userReaction = (data as ReactionsType[])[0].action;
            } else if ((data as ReactionsType[]).length === 0) {
              this.userReaction = null
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(error)
          }
        })
    }
  }

  reactionToComment(reaction: ReactionEnum, commentsId: string) {
    if (this.userIsLoggedIn) {
      this.commentsService.sendReaction(reaction, commentsId)
        .subscribe( {
          next: data => {
            if (data.error) {
              this.snackBar.openSnackBar(data.message)
            } else {
              this.snackBar.openSnackBar('Ваш голос учтен');
              this.getReaction();

            }
          },
          error: () => this.snackBar.openSnackBar('Жалоба уже отправлена')
        })
    }
  }

 getReaction():void {
   if (this.userIsLoggedIn) {
     this.commentsService.getReactionForComment(this.comment.id)
       .subscribe({
         next: (data) => {
           if ((data as DefaultResponseType).error) {
             throw new Error((data as DefaultResponseType).message)
           }
           if (data && (data as ReactionsType[]).length > 0) {
             this.userReaction = (data as ReactionsType[])[0].action;
           } else if ((data as ReactionsType[]).length === 0) {
             this.userReaction = null
           }
           this.changeReaction(this.userReaction)
         },
         error: (error: HttpErrorResponse) => {
           console.log(error)
         }
       })
   }
 }

 changeReaction(reaction: ReactionEnum | null) {
    this.addToReactionEvent.emit({commentId: this.comment.id, reaction: reaction});
 }

}

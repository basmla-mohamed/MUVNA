/*
1- Git is a tool installed on computer that tracks every change you make to your files,
and after you finish it send all changes you do to github

2-gitHub is a website that stores all Git projects online

3-Git works offline. GitHub needs the internet

4-A repository (repo) its project folder plus its full history.

5-Branch that all new features i added

6-Local repo that the copy of repo i took it to edit

7-Remote repo that is the version stored in gitHub

8-Commit the edit i do 

9-Clone its the first copy of remote repo

10-push means upload all changes from local repo to remote repository

11-pull mean uploading updates from remote repo to local

12-pull request a request i do if i add commit after that the owner of this repo can accpect my commit and put it in
his code or ignore

13-To download your project to git
    git clone [gitHub link]

14-The history is stored in a hidden folder called .git If you delete it, you lose the history (not the files) danger

15-Every file moves through many areas: 
firstly all files exist on remote repo after that we send a clone to  Working Directory when the clone moved it take a 
checkOut [we now on Working Directory] after that we go to 2nd step Staging Area we move to it by add files we would 
add we now on [Staging Area] to go to local repo we do commit and every commit must take message we now on
[local repository] after all that we push all changes i do to the [remote repo]
        Working Directory => Staging Area => local repo => remote Repository

16- remote repo 
local repo contains 
    1-Working Directory 
    2-Staging area
    3-local repo

17-git status shows the current state of all files, we Use it all the times to know what have done

18-File states => Untracked (new)
, Modified (changed)
, Staged (ready to commit)

19-git log --oneLine show your commit history, one line within commit

20- .gitignore file Git should never track and upload it on gitHub like node_modules/ and .env. Create it before
 your first commit.

21- to ignore all files without....
we use !


22- open folder code.
open file explorer 

23-git restore --staged means file removes a file from staging area but Your changes are kept

24-git reset --mixed move the commit back to the working directory

25-git reset --soft move the commit back to the Staging area

26- HEAD current commit
    HEAD~1 previous commit

27- git reset --hard undo everything and deletes your changes It is the most dangerous command

28-The default branch is usually called main and the branch we put all changes on it called origin

29-git branch show your branches.

30-git checkout main mean we on main branch

31-git checkout login mean we on login branch

32- git pull origin main means put all changes on main to in origin

33- checkout === switch(new)

34- we use in .gitignore file 
      output/*   means all folders
      *.html     means all html files

35-FORK????
    means to take someOne project 

36- if iam on any commit and want to back??
      git revert --no-commit
      git revert --continue
      git commit -m "BACK 1"
      git commit origin main
        step 4 mean put all changes that happened on main branch(local repo)
        in origin branch (remote repo)

*/

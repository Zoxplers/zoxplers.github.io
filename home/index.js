/*Made by Matthew Amurao*/

lockHeading = true;

if(lockHeading)
{
    document.body.insertBefore(document.getElementsByTagName("heading")[0], document.getElementsByTagName("main")[0]);
    document.body.insertBefore(document.getElementsByTagName("navbar")[0], document.getElementsByTagName("main")[0]);
}

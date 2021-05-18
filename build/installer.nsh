!include LogicLib.nsh

!macro customInstall

  #nsExec::ExecToStack 'powershell.exe "& "Import-Module MicrosoftTeams"'
  nsExec::ExecToStack 'powershell.exe "& "Get-Module -listavailable | select-string -pattern "MicrosoftTeams"'

  Pop $0
  Pop $1

  MessageBox MB_OK $0
  MessageBox MB_OK $1

  ${If} $0 == "0" 
    DetailPrint "MicrosoftTeams installed!"
  ${Else}
    nsExec::ExecToStack 'powershell.exe "& "Install-Module MicrosoftTeams -Confirm -Scope AllUsers"'

    Pop $2
    Pop $3
    
    ${If} $2 == "0"
      DetailPrint "Module instalation status: $2"
    ${Else}
      MessageBox MB_OK "The MicrosoftTeams powershell module isn't installed. Please try again!"
      Quit
    ${Endif}
  ${EndIf}
!macroend
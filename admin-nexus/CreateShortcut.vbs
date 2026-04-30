Set objShell = WScript.CreateObject("WScript.Shell")
strDesktop = objShell.SpecialFolders("Desktop")
Set objShortcut = objShell.CreateShortcut(strDesktop & "\Sovereign Admin Nexus.lnk")
objShortcut.TargetPath = WScript.Arguments.Item(0)
objShortcut.WindowStyle = 1
objShortcut.Description = "Sovereign Admin God-Mode"
objShortcut.WorkingDirectory = WScript.Arguments.Item(1)
objShortcut.Save

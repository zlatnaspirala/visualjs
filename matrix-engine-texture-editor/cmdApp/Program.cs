using System;
using System.Windows.Forms;
using CmdWindowControlTestApp;
 ﻿
/***************************************************************************************
*  Author: Curt C.
*  Email : harpyeaglecp@aol.com
*
*  Project File: "Solving Problems of Monitoring Standard Output and Error Streams Of A Running Process" 
*                for http://www.codeproject.com
*  
*  This software is released under the Code Project Open License (CPOL)
*
*  See official license description at: http://www.codeproject.com/info/cpol10.aspx
*  
* This software is provided AS-IS without any warranty of any kind.
*
* >>> Please leave this header intact when using this file in other projects <<<
***************************************************************************************/


namespace CommandWindowControlTestApp
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}

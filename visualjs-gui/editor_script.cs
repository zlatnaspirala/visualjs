using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading;

namespace Visual_JS
{
    public partial class editor_script : Form
    {
        private void CheckKeyword(string word, Color color, int startIndex)
        {
            if (this.editor_text_box_1.Text.Contains(word))
            {
                int index = -1;
                int selectStart = this.editor_text_box_1.SelectionStart;

                while ((index = this.editor_text_box_1.Text.IndexOf(word, (index + 1))) != -1)
                {
                    this.editor_text_box_1.Select((index + startIndex), word.Length);
                    this.editor_text_box_1.SelectionColor = color;
                    this.editor_text_box_1.Select(selectStart, 0);
                    this.editor_text_box_1.SelectionColor = Color.FromArgb(192, 192, 255);
                }
            }
        }

        public editor_script()
        {
            InitializeComponent();

            string localPath = Application.StartupPath + "//webwww.userdata";
            Console.Write(localPath);
            if (File.Exists(localPath))
            {

                System.IO.StreamReader file = new System.IO.StreamReader(localPath);

                SETUP_LOCALHOST.Text = file.ReadToEnd();
                Console.Write("READ FROM startUP exe ");
                file.Close();
            }
            else
            {
                // nothing
            }

        }

        public string APPLICATION_PATH_PROJECT_INSTANCE = "d:\\";
        public string APPLICATION_PATH_PROJECT_INSTANCE_ROOT = "";

        public string RUN_RETURN_CODE = "";
        public int CODE_EDITOR_ACTIVE_LINE = 0;
        string CURRENT_EDITOR_FILENAME = "";

        public string WWW_PATH;

        public string SERVER_PATH = "";

        public string CURRENT_TREE_FOLDER_SELECTED = "";

        Process procRes = new Process();
 

        public void LOAD_PROJECT()
        {
            REFRESH_TREE();

        }

        void REFRESH_TREE() {

            DirectoryInfo directoryInfo = new DirectoryInfo(APPLICATION_PATH_PROJECT_INSTANCE);


            if (directoryInfo.Exists)
            {
                treeView1.Nodes.Clear();
                treeView1.AfterSelect += treeView1_AfterSelect;
                BuildTree(directoryInfo, treeView1.Nodes);
            }

        }

        private void editor_script_Rezise(object sender, EventArgs e)
        {
            

            if (FormWindowState.Minimized == this.WindowState)
    {
                notifyIcon1.Visible = true;
              //  notifyIcon1.ShowBalloonTip(500);
                this.Hide();
    }

    else if (FormWindowState.Normal == this.WindowState)
    {
                notifyIcon1.Visible = false;
    }

    }

        private void editor_script_Load(object sender, EventArgs e)
        {

           
            //get app path 


            //  Form SETTINGS = new Form1();
            //  SETTINGS.Show();

            // this.Text = SETTINGS.clientPathBTN.text;
            //################################################
            // get dir from settings form 
            //################################################

            //DirectoryInfo directoryInfo = new DirectoryInfo(@"E:\web_server\xampp\htdocs\PRIVATE_SERVER\FRAMEWORK\visual_JS_source\src\visual_JS_source\project_instance");

          

            //################################################
            //################################################

        }

        private void splitContainer1_Panel1_Paint(object sender, PaintEventArgs e)
        {

        }



        //################################################
        //editor file rtee
        //################################################

        private void BuildTree(DirectoryInfo directoryInfo, TreeNodeCollection addInMe)
        {
            TreeNode curNode = addInMe.Add(directoryInfo.Name);

            try
            {

                foreach (FileInfo file in directoryInfo.GetFiles())
                {
                    curNode.Nodes.Add(file.FullName, file.Name);
                }
                foreach (DirectoryInfo subdir in directoryInfo.GetDirectories())
                {
                    BuildTree(subdir, curNode.Nodes);
                }


            }
            catch (Exception e)
            {


            }
        }

        private void treeView1_AfterSelect(object sender, TreeViewEventArgs e)
        {
           
        }

        private void editor_text_box_1_TextChanged(object sender, EventArgs e)
        {

            label1.Text = "Status:Changed";
            label1.ForeColor = Color.DarkRed;

            this.CheckKeyword("SYS", Color.OrangeRed , 0);
            this.CheckKeyword("SURF", Color.MediumVioletRed, 0);

            this.CheckKeyword("if", Color.White, 0);
            this.CheckKeyword("(", Color.White, 0);
            this.CheckKeyword(")", Color.White, 0);
            this.CheckKeyword("{", Color.White, 0);
            this.CheckKeyword("}", Color.White, 0);
            this.CheckKeyword("var ", Color.White, 0);
            this.CheckKeyword(" new ", Color.White, 0);
            this.CheckKeyword(" Switch", Color.White, 0);
            this.CheckKeyword(" Break", Color.White, 0);
            this.CheckKeyword(" return ", Color.White, 0);
            this.CheckKeyword("function", Color.White, 0);
            this.CheckKeyword(" window", Color.GreenYellow, 0);


            this.CheckKeyword(" Number", Color.YellowGreen, 0);
            this.CheckKeyword(" Array", Color.YellowGreen, 0);
            this.CheckKeyword(" Object", Color.YellowGreen, 0);
            this.CheckKeyword(" Array", Color.YellowGreen, 0);
            this.CheckKeyword(" Number", Color.YellowGreen, 0);
            this.CheckKeyword(" String", Color.YellowGreen, 0);

            //this.CheckKeyword("\"/", Color.YellowGreen, 0);

            CODE_EDITOR_ACTIVE_LINE = editor_text_box_1.GetLineFromCharIndex(editor_text_box_1.SelectionStart);

        }

        private void editor_text_box_1_MouseDown(object sender, MouseEventArgs e)
        {

            CODE_EDITOR_ACTIVE_LINE = editor_text_box_1.GetLineFromCharIndex(editor_text_box_1.SelectionStart);

            if (e.Button == System.Windows.Forms.MouseButtons.Right)
            {
                // MessageBox.Show("you got it!");
            }
        }


        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {

            this.Close();

        }

        private void treeView1_AfterSelect_1(object sender, TreeViewEventArgs e)
        {
            if (e.Node.Name.EndsWith("txt") || e.Node.Name.EndsWith("js"))
            {
                this.editor_text_box_1.Clear();
                StreamReader reader = new StreamReader(e.Node.Name);

                CURRENT_EDITOR_FILENAME = e.Node.Name;
                editorActiveFile.Text = CURRENT_EDITOR_FILENAME;
                this.editor_text_box_1.Text = reader.ReadToEnd();
                reader.Close();
            }


            //treeView1.SelectedNode.FullPath
            string IN = e.Node.FullPath;

            String[] elements = Regex.Split(IN, "//" );
            foreach (var element in elements) {

                Console.WriteLine(element);
                APPLICATION_PATH_PROJECT_INSTANCE_ROOT = APPLICATION_PATH_PROJECT_INSTANCE.Replace( element , "");

            } 
            SelectedPath_TREE.Text = APPLICATION_PATH_PROJECT_INSTANCE_ROOT;// + e.Node.FullPath + "\\";

        
            //+  treeView1.SelectedNode.FullPath
            Console.Write("FullPath : " , treeView1.SelectedNode.FullPath);
            Console.Write("e.Node.Name : ", e.Node.Name);

        }

        private void splitContainer1_Panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void toolStripComboBox1_Click(object sender, EventArgs e)
        {

        }

        private void getAllAnimationResourceToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void newGameObjectToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            FormAdd NEW_FORM = new FormAdd();
            NEW_FORM.CLIENR_PATH = APPLICATION_PATH_PROJECT_INSTANCE;
            NEW_FORM.ShowDialog();
            

            generatedPre.Text = NEW_FORM.COMMAND_NEW_GO;

        }

        private void splitContainer2_Panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void insert_code_Click(object sender, EventArgs e)
        {

            SAVE_DOC();
            Thread.Sleep(100);

            if (generatedPre.Text != "")
            {
                List<string> s = new List<string>(
                editor_text_box_1.Text.Split(new string[] { "\n" }, StringSplitOptions.None));

                int counter = 0;

                string NEW_CONTENT = "";
                s.ForEach(delegate (String currentLineString)
                {

                    NEW_CONTENT += currentLineString;
                    NEW_CONTENT += "\n";
                    if (counter == CODE_EDITOR_ACTIVE_LINE)
                    {

                        Console.Write("insert code done...");

                        NEW_CONTENT += "\n";
                        //  NEW_CONTENT += "// generated code block \n";
                        NEW_CONTENT += generatedPre.Text;
                        NEW_CONTENT += "\n";

                    }

                    counter++;


                });

                
                editor_text_box_1.Text = NEW_CONTENT;
                generatedPre.Text = "";
                SAVE_DOC();
                Thread.Sleep(100);
                StreamReader reader = new StreamReader(CURRENT_EDITOR_FILENAME);
                editorActiveFile.Text = CURRENT_EDITOR_FILENAME;
                editor_text_box_1.Text = reader.ReadToEnd();
                reader.Close();
                

            }
            else {
                MessageBox.Show("First click on Add->New Game Object !");
            }


        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {

            SAVE_DOC();

        }

        private void visualjsWindowsGUIToolStripMenuItem_Click(object sender, EventArgs e)
        {

            About ABOUT_FORM = new About();
            ABOUT_FORM.ShowDialog();

        }

        private void generatedPre_TextChanged(object sender, EventArgs e)
        {

        }

        private void runInChromeToolStripMenuItem_Click(object sender, EventArgs e)
        {

            try
            {


                Process.Start("Chrome.exe", WWW_PATH);

        }
            catch (Exception err) {

                MessageBox.Show("You will need to download and install Chrome for windows...");
            }

}

private void runInMozillaToolStripMenuItem_Click(object sender, EventArgs e)
        {

    try
    {

        Process.Start("Firefox.exe", WWW_PATH);

        }
            catch (Exception err) {

                MessageBox.Show("You will need to download and install Firefox for windows...");
            }

}

private void runInOperaToolStripMenuItem_Click(object sender, EventArgs e)
        {

    try
     {

        Process.Start("opera.exe", WWW_PATH);

        }
            catch (Exception err) {

                MessageBox.Show("You will need to download and install Opera for windows...");
            }

}

private void runInSafariforWinToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {

                Process.Start("Safari.exe", WWW_PATH);

            }
            catch (Exception err) {

                MessageBox.Show("You will need to download and install safari for windows...");
            }
            

        }

        private void newScriptToolStripMenuItem_Click(object sender, EventArgs e)
        {


            string name_ = ShowDialogInput("Enter for new script name (important without .js file exstensions) : " , "New script" );
            // 
            System.IO.File.WriteAllText(APPLICATION_PATH_PROJECT_INSTANCE + "//scripts//"+ name_ + ".js" ,  "// script name :   " + name_ );
            
            int counter = 0;
            string line;
            string new_run_js = "";
            // Read the file and display it line by line.
            System.IO.StreamReader file = new System.IO.StreamReader(APPLICATION_PATH_PROJECT_INSTANCE + "//starter//run.js");
            
            while ((line = file.ReadLine()) != null)
            {
                new_run_js += line + "\n";
                counter++;
            }

            new_run_js += " SYS.SCRIPT.LOAD('scripts//"+name_+".js'); " + "\n";
            file.Close();
        
            System.IO.File.WriteAllText(APPLICATION_PATH_PROJECT_INSTANCE + "//starter//run.js", new_run_js );
            
            REFRESH_TREE();


        }

        
        //################################################
        //################################################


        public static string ShowDialogInput(string text, string caption)
        {
            Form prompt = new Form()
            {
                Width = 500,
                Height = 150,
                FormBorderStyle = FormBorderStyle.None,
                
                Text = caption,
                StartPosition = FormStartPosition.CenterScreen
            };
            Label textLabel = new Label() { Left = 50, Top = 20, Text = text };
            TextBox textBox = new TextBox() { Left = 50, Top = 50, Width = 400 };
            Button confirmation = new Button() { Text = "Ok", Left = 350, Width = 100, Top = 70, DialogResult = DialogResult.OK };
            confirmation.Click += (sender, e) => { prompt.Close(); };
            prompt.Controls.Add(textBox);
            prompt.Controls.Add(confirmation);
            prompt.Controls.Add(textLabel);
            prompt.AcceptButton = confirmation;

            return prompt.ShowDialog() == DialogResult.OK ? textBox.Text : "";
        }

        private void saveAndExitToolStripMenuItem_Click(object sender, EventArgs e)
        {

            SAVE_DOC();
            this.Close();


        }

        private void SAVE_DOC() {

            try
            {
                System.IO.File.WriteAllText(CURRENT_EDITOR_FILENAME, editor_text_box_1.Text);
                label1.Text = "Status:Saved";
                label1.ForeColor = Color.Lime;
            }
            catch (Exception err)
            {
                Console.Write("Error in save menu item");


            }



        }

        private void animationObjectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.FileName = "node";
            startInfo.Arguments = APPLICATION_PATH_PROJECT_INSTANCE + "\\res.js";
            procRes = Process.Start(startInfo);
            startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.RedirectStandardOutput = true;
            startInfo.UseShellExecute = false;
            startInfo.RedirectStandardError = true;
        }

        private void multilanguageToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.FileName = Application.StartupPath + @"\\ML_SYS.exe";
           Process  procRes = Process.Start(startInfo);
            //startInfo.UseShellExecute = false;
        }

        private void secureCodeToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.FileName = Application.StartupPath + @"\\CriptingJS.exe";
            Process procRes = Process.Start(startInfo);
        }

        private void forImagesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ImageResourceForm RESFORM = new ImageResourceForm();
            RESFORM.RES_FOLDER_PATH = APPLICATION_PATH_PROJECT_INSTANCE + "\\res\\animations\\";
            RESFORM.Show();
        }

        private void functionToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //QC

string NEWF = @"

 function REPLACETHIS () 
    {               
                   
                   
                   
    } 
     
";

            INSERT_QC(NEWF);


        }





        // POLUMORF 

        private void INSERT_QC(string qc_) {


            List<string> s = new List<string>(
            editor_text_box_1.Text.Split(new string[] { "\n" }, StringSplitOptions.None));

            int counter = 0;

            string NEW_CONTENT = "";
            s.ForEach(delegate (String currentLineString)
            {

                NEW_CONTENT += currentLineString;
                NEW_CONTENT += "\n";
                if (counter == CODE_EDITOR_ACTIVE_LINE)
                {

                    Console.Write("insert Q code done...");

                    NEW_CONTENT += "\n";
                    //  NEW_CONTENT += "// generated code block \n";
                    NEW_CONTENT +=  qc_;
                    NEW_CONTENT += "\n";

                }

                counter++;


            });
            
            editor_text_box_1.Text = NEW_CONTENT;

            
        }

        private void ifReplaceReplaceToolStripMenuItem_Click(object sender, EventArgs e)
        {


            string NEWF = @"

 if ( REPLACE1 == REPLACE2 ) 
    {                    
                        
                        
    } 
     
";

            INSERT_QC(NEWF);


        }

        private void ifToolStripMenuItem_Click(object sender, EventArgs e)
        {
            string NEWF = @"

 if ( REPLACE1 > REPLACE2 ) 
    {                    
                        
                        
    } 
     
";

            INSERT_QC(NEWF);

        }

        private void ifToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            string NEWF = @"

 if ( REPLACE1 < REPLACE2 ) 
    {                    
                        
                        
    } 
     
";

            INSERT_QC(NEWF);

        }

        private void ifIfElseIfToolStripMenuItem_Click(object sender, EventArgs e)
        {
            string NEWF = @"

 if ( REPLACE1 == REPLACE2 ) 
    {                    
                        
                        
    }
 else if ( REPLACE1 == REPLACE3 ) 
    {                 
                      
                     
    } 
     
";

            INSERT_QC(NEWF);

        }

        private void ifElseIfElseToolStripMenuItem_Click(object sender, EventArgs e)
        {
            string NEWF = @"

 if ( REPLACE1 == REPLACE2 ) 
    {                    
                        
                        
    }
 else if ( REPLACE1 == REPLACE3 ) 
    {                 
                      
                     
    } 
 else {


   }
     
";

            INSERT_QC(NEWF);

        }

        private void setTimeOutToolStripMenuItem_Click(object sender, EventArgs e)
        {


            string NEWF = @"

   setTimeout( function() { 





    } , 1000 );
     
";

            INSERT_QC(NEWF);



        }

        private void setIntervalToolStripMenuItem_Click(object sender, EventArgs e)
        {



            string NEWF = @"

   setInterval( function() { 





    } , 1000 );
     
";

            INSERT_QC(NEWF);


        }

        private void classToolStripMenuItem_Click(object sender, EventArgs e)
        {


            string NEWF = @"

class Programmer { 

  constructor(name) {

    this.name = name;

  }
  
  getName () {

    alert(this.name + ' is your name.');

  }

}
     
";

            INSERT_QC(NEWF);


        }

        private void consolelogToolStripMenuItem_Click(object sender, EventArgs e)
        {



            string NEWF = @"

       console.log('    ');
 
";

            INSERT_QC(NEWF);


        }

        private void functionbasedClassesToolStripMenuItem_Click(object sender, EventArgs e)
        {


            string NEWF = @"

    function Programmer (name) {

      this.name = name;  
      this.type = 'game_dev';

     Programmer.prototype.speak = function () {

       console.log(this.name + ' makes a program.');

     }

   }

  
 
";

            INSERT_QC(NEWF);


        }

        private void forAudiosToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ImageResourceForm RESFORM = new ImageResourceForm();
            RESFORM.RES_FOLDER_PATH = APPLICATION_PATH_PROJECT_INSTANCE + "\\res\\audio\\";
            RESFORM.Text = "Resource folder with audio files.";
            RESFORM.splitContainer1.SplitterDistance = 800;

            RESFORM.Show();
        }

        private void makeBuildLibToolStripMenuItem_Click(object sender, EventArgs e)
        {


MessageBox.Show(@" This program will put every script from /lib folder intro single file build.js . build.html is already prepared for this library. Index.html will still use js files from lib. If you make some changes in lib directory , changes will infect build.js .
Thank you for using visual-js GUI ! " , "About buils.js" , MessageBoxButtons.OK , MessageBoxIcon.Information );
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.FileName = Application.StartupPath + @"\\MakeLib.exe";
            procRes = Process.Start(startInfo);
            
             
        }

        private void setupLocalhostIfYouDontUseApacheHtdocsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
            string promptValue = Prompt_www.ShowDialog("If you dont use apache please enter your path to the project. example : localhost//path_project_root//...  to the index.html ", "Setup WWW path - if your webserver public folder name is htdocs cancel this dialog");
            
            // CREATE INSTANCE OF NEW PROJECT
            //System.Windows.Forms.MessageBox.Show("Please select server develop path on your computer. (for Node.js files) ", "CREATE NEW APP");
      

            if (promptValue.ToString() != "")
            {

                SETUP_LOCALHOST.Text = promptValue;
                System.IO.File.WriteAllText( Application.StartupPath + "\\webwww.userdata", promptValue );

            }



         }

        private void htdocsIsMyPublicDirClearSetupDataToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (File.Exists(Application.StartupPath + "\\webwww.userdata"))
            {
                File.Delete(Application.StartupPath + "\\webwww.userdata");
            }
        }

        private void notifyIcon1_MouseDoubleClick(object sender, MouseEventArgs e)
        {

        }

        private void notifyIcon1_MouseClick(object sender, MouseEventArgs e)
        {
            this.Show();
            this.Visible = true;
            this.WindowState = FormWindowState.Maximized;
        }
    }
}

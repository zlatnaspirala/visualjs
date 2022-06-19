/*
############################
Created by Nikola Lukic
zlatnaspirala@gmail.com
############################
*/
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;

namespace Visual_JS
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();


        }

        public string LOGS_EDITOR;
        public string LOCALHOST_PATH;

        static void process_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            string stringResults = (string)e.Data;
            // Prepend line numbers to each line of the output.
            if (!String.IsNullOrEmpty(e.Data))
            {
                //lineCount++;
                //LOGS_EDITOR += "\n[" + lineCount + "]: " + e.Data + "";
                //Debug.Print("aaaaaaaaaaaaaaaaaaaaaaaaaaa");

            }

        }

        //GLOBAL
        StringBuilder standardOutput = new StringBuilder();
        Process proc = new Process();
        Process procRes = new Process();

        private void STR_EDITOR_Click(object sender, EventArgs e)
        {
            //Process.Start(@"%AppData%\..\Local\Google\Chrome\Application\chrome.exe",  "http:\\www.YourUrl.com");

            if (STR_EDITOR.Text == "START ON/PAGE EDITOR") {

                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
                startInfo.FileName = "node";
                startInfo.Arguments = editorPath.Text + "\\editor.js";//"E:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\FRAMEWORK\\HardCoreJS_IDE_source\\server\\editor.js";

                proc = Process.Start(startInfo);
                startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
                startInfo.RedirectStandardOutput = true;
                startInfo.UseShellExecute = false;
                startInfo.RedirectStandardError = true;
                proc.OutputDataReceived += new DataReceivedEventHandler(process_OutputDataReceived);
                System.Threading.Thread.Sleep(1500);

                STR_EDITOR.Text = "STOP ENGINE";
                button12.Enabled = true;
                button12.BackColor = Color.Gray;

                button13.Enabled = true;
                button13.BackColor = Color.Gray;

                button14.Enabled = true;
                button14.BackColor = Color.Gray;

                button15.Enabled = true;
                button15.BackColor = Color.Gray;

            }
            else {

                Process[] prs = Process.GetProcesses();

                foreach (Process pr in prs)
                {
                    if (pr.ProcessName == "node")
                    {

                        pr.Kill();
                        STR_EDITOR.Text = "START ON/PAGE EDITOR";
                    }

                }

            }

        }

        private void button1_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog serverpath = new FolderBrowserDialog();
            DialogResult result = serverpath.ShowDialog();

            if (result.ToString() != "Cancel" && label2.Text != "APP NOT CREATED YET") {

                editorPath.Text = serverpath.SelectedPath.ToString();
                string[] files = Directory.GetFiles(serverpath.SelectedPath);
                string PATH = Application.StartupPath + "\\projects\\" + label2.Text + ".visualJS";
                System.IO.File.WriteAllText(PATH, label2.Text + "\n" + editorPath.Text + "\n" + clientPathBTN.Text + "\n");
                LOAD();
                System.Windows.Forms.MessageBox.Show("Files found: " + files.Length.ToString(), "Saved project.");

            }

        }

        private void button3_Click(object sender, EventArgs e)
        {

        }


        private void button4_Click(object sender, EventArgs e)
        {
            string promptValue = Prompt.ShowDialog("Application name:", "demo1");
            // CREATE INSTANCE OF NEW PROJECT
            System.Windows.Forms.MessageBox.Show("Please select server develop path on your computer. (for Node.js files) ", "CREATE NEW APP");
            FolderBrowserDialog APPPath = new FolderBrowserDialog();
            DialogResult result = APPPath.ShowDialog();

            if (result.ToString() != "Cancel")
            {

                editorPath.Text = APPPath.SelectedPath.ToString();

                Form1.ActiveForm.Text = "Wait for secund .. copying files ";
                //copy server instance
                COPY.Copy(Application.StartupPath + @"\server_instance\", editorPath.Text);
                Form1.ActiveForm.Text = "Select new project and click OPEN";
                System.Windows.Forms.MessageBox.Show("Please select web app develop path on your computer. (for javascript and html files)", "CREATE NEW APP");
                FolderBrowserDialog APPPath1 = new FolderBrowserDialog();
                DialogResult result1 = APPPath1.ShowDialog();

                if (result1.ToString() != "Cancel")
                {
                    clientPathBTN.Text = APPPath1.SelectedPath.ToString();
                    //copy procedure 
                    string PATH = Application.StartupPath + "\\projects\\" + promptValue + ".visualJS";
                    System.IO.File.WriteAllText(PATH, promptValue + "\n" + editorPath.Text + "\n" + clientPathBTN.Text + "\n");
                    LOAD();
                    //button5.PerformClick();

                    // copy root folder 

                    Form1.ActiveForm.Text = "Wait for secund .. copying files ";
                    COPY.Copy(Application.StartupPath + @"\program_instance\", clientPathBTN.Text);
                    Form1.ActiveForm.Text = "Select new project and click OPEN";

                }
                else
                {

                    System.Windows.Forms.MessageBox.Show("FAILD ", "CREATE NEW APP", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }


            }
            else {

                System.Windows.Forms.MessageBox.Show("FAILD ", "CREATE NEW APP", MessageBoxButtons.OK, MessageBoxIcon.Error);

            }


        }

        public static void CopyFilesRecursively(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (DirectoryInfo dir in source.GetDirectories())
                CopyFilesRecursively(dir, target.CreateSubdirectory(dir.Name));
            foreach (FileInfo file in source.GetFiles())
                file.CopyTo(Path.Combine(target.FullName, file.Name));
        }



        private void listPROJECTS_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {

                this.Text = listPROJECTS.SelectedItem.ToString();
                GET_DATA2();
                button5.Enabled = true;
            }
            catch (Exception err) {


            }
        }

        public string PROJECTS;
        private void button5_Click(object sender, EventArgs e)
        {

            GET_DATA();

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            LOAD();
            GET_WWW();

            NEWS.Navigate("https://maximumroulette.com/welcome/news.html");

        }


        public void GET_DATA()
        {

            int counter = 0;
            string line;

            if (listPROJECTS.SelectedItem != null)
            {
                string PATH = listPROJECTS.SelectedItem.ToString();
                System.IO.StreamReader file = new System.IO.StreamReader(PATH);

                while ((line = file.ReadLine()) != null)
                {

                    if (counter == 0)
                    {
                        label2.Text = line;
                    }
                    else if (counter == 1)
                    {
                        editorPath.Text = line;
                    }
                    else if (counter == 2)
                    {
                        clientPathBTN.Text = line;

                        STR_EDITOR.Enabled = true;
                        //editor gui
                        button11.Enabled = true;

                        button6.Enabled = true;
                        button2.Enabled = true;
                        button7.Enabled = true;
                        button8.Enabled = true;
                        button10.Enabled = true;
                        button11.Enabled = true;

                    }
                    counter++;
                }

                file.Close();
                PROJECTS = System.IO.File.ReadAllText(PATH);

                try
                {
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                    string PATH_TO_CONFIG = editorPath.Text + "\\config.js";
                    System.IO.StreamReader fileCONFIG = new System.IO.StreamReader(PATH_TO_CONFIG);
                    textBox1.Text = fileCONFIG.ReadToEnd();
                    fileCONFIG.Close();
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                }
                catch (Exception e) {

                    System.Windows.Forms.MessageBox.Show("FAILD ", "Wrong path ", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }


            }

        }

        public void GET_DATA2()
        {

            int counter = 0;
            string line;

            if (listPROJECTS.SelectedItem != null)
            {
                string PATH = listPROJECTS.SelectedItem.ToString();
                //listPROJECTS.SelectedValue
                System.IO.StreamReader file = new System.IO.StreamReader(PATH);

                while ((line = file.ReadLine()) != null)
                {

                    if (counter == 0)
                    {
                        label5.Text = line;
                    }
                    else if (counter == 1)
                    {

                    }
                    else if (counter == 2)
                    {

                    }
                    counter++;
                }

                file.Close();
                PROJECTS = System.IO.File.ReadAllText(PATH);

            }

        }

        private void LOAD()
        {
            string PATH = Application.StartupPath + "\\projects\\";
            string[] LIST_OF_PROJECTS = System.IO.Directory.GetFiles(PATH);

            listPROJECTS.Items.Clear();

            for (int x = 0; x < LIST_OF_PROJECTS.Length; x++)
            {
                //Console.Write(LIST_OF_PROJECTS[x]);
                listPROJECTS.Items.Add(LIST_OF_PROJECTS[x]);
            }

            if (listPROJECTS.SelectedIndex != -1)
            {
                listPROJECTS.SelectedIndex = 0;
            }

            if (LIST_OF_PROJECTS.Length == 1) { listPROJECTS.Items.Add(LIST_OF_PROJECTS[0]); }



        }

        private void button6_Click(object sender, EventArgs e)
        {

        }

        private void editorPath_Click(object sender, EventArgs e)
        {
            this.Text = editorPath.Text;
        }

        private void clientPathBTN_Click(object sender, EventArgs e)
        {
            this.Text = editorPath.Text;
        }

        private void button2_Click(object sender, EventArgs e)
        {

            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.FileName = "node";
            startInfo.Arguments = editorPath.Text + "\\res.js";
            procRes = Process.Start(startInfo);
            startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.RedirectStandardOutput = true;
            startInfo.UseShellExecute = false;
            startInfo.RedirectStandardError = true;
            GET_RES_nidzaFile();

        }

        private void GET_RES_nidzaFile() {

            System.Threading.Thread.Sleep(5);

            string PATH = clientPathBTN.Text + "\\res\\animations\\resource.nidza";
            System.IO.StreamReader file = new System.IO.StreamReader(PATH);
            string line2;

            while ((line2 = file.ReadLine()) != null)
            {

                listBox1.Items.Add(line2);


            }

        }

        private void tabPage1_Click(object sender, EventArgs e)
        {

        }


        //MAKE PRODUCTION CLIENT PART
        private void button7_Click(object sender, EventArgs e)
        {
            //build_from_editor_to_visual_js_file
            ProcessStartInfo startInfo = new ProcessStartInfo();
       //     startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.FileName = "node";
            startInfo.Arguments = editorPath.Text + "\\build_from_editor_to_visual_js_file.js";
            procRes = Process.Start(startInfo);
       //     startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.RedirectStandardOutput = true;
            startInfo.UseShellExecute = false;
            startInfo.RedirectStandardError = true;

        }

        // SAVE CONFIG
        private void button6_Click_1(object sender, EventArgs e)
        {
            string PATH_TO_CONFIG = editorPath.Text + "\\config.js";
            System.IO.File.WriteAllText(PATH_TO_CONFIG, textBox1.Text);
            string loc = label6.Text;
            label6.Text = loc + @"saved.";

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            label6.Text = @"Server config";
        }

        // GET MANIFEST
        private void button8_Click(object sender, EventArgs e)
        {


            System.IO.StreamReader file = new System.IO.StreamReader(clientPathBTN.Text + "\\manifest\\manifest.js");
            string line1;
            string cc = "";
            while ((line1 = file.ReadLine()) != null)
            {

                cc = cc + "/n" + line1 + "\\n";

            }
            APP_NAME_MANIFEST.Text = cc;
            file.Close();


            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            string PATH_TO_CONFIG = clientPathBTN.Text + @"\\manifest\\manifest.js";
            System.IO.StreamReader fileCONFIG2 = new System.IO.StreamReader(PATH_TO_CONFIG);
            APP_NAME_MANIFEST.Text = fileCONFIG2.ReadToEnd();
            fileCONFIG2.Close();
            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


        }

        private void button9_Click(object sender, EventArgs e)
        {


        }

        private void button9_Click_1(object sender, EventArgs e)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.FileName = Application.StartupPath + @"\\ML_SYS.exe";
            procRes = Process.Start(startInfo);
            //startInfo.UseShellExecute = false;

            //MakeLib
        }

        private void button10_Click(object sender, EventArgs e)
        {
            string PATH_TO_CONFIG = clientPathBTN.Text + "\\manifest\\manifest.js";
            System.IO.File.WriteAllText(PATH_TO_CONFIG, APP_NAME_MANIFEST.Text);

        }

        private void button11_Click(object sender, EventArgs e)
        {


            editor_script editor = new editor_script();

            editor.APPLICATION_PATH_PROJECT_INSTANCE = clientPathBTN.Text;
            editor.SERVER_PATH = editorPath.Text;

            
            editor.LOAD_PROJECT();
            GET_WWW();
            if (editor.SETUP_LOCALHOST.Text != "")
            {
                editor.WWW_PATH = editor.SETUP_LOCALHOST.Text;
                Console.Write("OKOOOOOOOOOOOOOOOOOOO");
            }
            else {
                editor.WWW_PATH = LOCALHOST_PATH;
            }
            

            editor.Show();



        }

        private void button12_Click(object sender, EventArgs e)
        {

            GET_WWW();
            Process.Start( "chrome.exe", LOCALHOST_PATH);


        }
 
        //hendler 
        private void  GET_WWW(){


            int II = clientPathBTN.Text.IndexOf("htdocs");
            II = II + 6;
            string HANDLE_EDITOR_1 = "";
            HANDLE_EDITOR_1 = clientPathBTN.Text.Remove(0, II);
            Console.Write("HANDLER : " , HANDLE_EDITOR_1 );
            HANDLE_EDITOR_1 = "localhost" + HANDLE_EDITOR_1;
            LOCALHOST_PATH = HANDLE_EDITOR_1;
            
        }

        private void button14_Click(object sender, EventArgs e)

        {

            GET_WWW();
            Process.Start("Safari.exe", LOCALHOST_PATH);

        }

        private void button13_Click(object sender, EventArgs e)
        {

            GET_WWW();
            Process.Start("Firefox.exe", LOCALHOST_PATH);

        }

        private void button15_Click(object sender, EventArgs e)
        {
            GET_WWW();
            Process.Start("Opera.exe", LOCALHOST_PATH);
        }

        private void tabPage2_Click(object sender, EventArgs e)
        {

        }

        private void notifyIcon1_MouseDoubleClick(object sender, MouseEventArgs e)
        {
     
        }

        private void Form1_Resize(object sender, EventArgs e)
        {


            if (FormWindowState.Minimized == this.WindowState)
            {
                notifyIcon1.Visible = true;
                notifyIcon1.ShowBalloonTip(500);
                this.Hide();
            }

            else if (FormWindowState.Normal == this.WindowState)
            {
                notifyIcon1.Visible = false;
            }
        }

        private void notifyIcon1_MouseClick(object sender, MouseEventArgs e)
        {
            this.Show();
            this.Visible = true;
            this.WindowState = FormWindowState.Normal;
        }
    }

}

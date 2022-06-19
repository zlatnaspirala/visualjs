using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;


namespace Visual_JS
{
    public partial class FormAdd : Form
    {


        public string CLIENR_PATH = "";
        public string COMMAND_NEW_GO ="";

        public FormAdd()
        {
            InitializeComponent();
        }

        //globals
        int formy = 0;
        Rectangle resolution = Screen.PrimaryScreen.Bounds;
        System.Windows.Forms.Timer t = new System.Windows.Forms.Timer();
        System.Windows.Forms.Timer tCancel = new System.Windows.Forms.Timer();

        private void FormAdd_Load(object sender, EventArgs e)
        {

            

            this.StartPosition = FormStartPosition.CenterScreen;
  
            this.Location = new Point(  resolution.Width/2 - Bounds.Width/2 , - this.Bounds.Height + 100 );
            formy = -this.Bounds.Height + 100;

          
            t.Interval = 1; // specify interval time as you want
            t.Tick += new EventHandler(timer_Tick);
            tCancel.Tick += new EventHandler(timer_TickCancel);
            
            t.Start();

            // load res images animation 
            int counter = 0;
            string line;
            string new_run_js = "";
            
            line = System.IO.File.ReadAllText(CLIENR_PATH + "//res//animations//resource.list");

            string[] tokens = line.Split(',');

            
                foreach (string line1 in tokens)
            {
                Console.WriteLine(line1);
                listOfResImages.Items.Add(line1);
            }

            //  



        }

        void timer_Tick(object sender, EventArgs e)
        {
            //Call method
            formy = formy + 30;
                this.Location = new Point(this.Location.X, formy );
            if (formy > ( resolution.Height/2  - this.Bounds.Height/2 )   ) {

                t.Stop();

            }

        }

        void timer_TickCancel(object sender, EventArgs e)
        {
            //Call method
            formy = formy - 30;
            this.Location = new Point(this.Location.X, formy);

          
            if (formy < (  - resolution.Height /1.5 ))
            {


                tCancel.Stop();
                this.Close();

            }

        }


        private void button2_Click(object sender, EventArgs e)
        {

            tCancel.Interval = 1;
            tCancel.Start();

          
        }

        private void button1_Click(object sender, EventArgs e)
        {

            //"" + PROGRAM_NAME + ".ENGINE.MODULES.ACCESS_MODULE( '" +  MODUL + "').NEW_OBJECT('" + name + "'," + x + " , " + y + "," + w + ","  + h + ");"

            if (listOfResImages.Text == "" && checkBox1.Checked == true)
            {
                MessageBox.Show("Must select item from resource drop list if you wanna add animation or image!");
            }
            else {


                COMMAND_NEW_GO = "" + program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').NEW_OBJECT('" + go_name.Text + "'," + plusMinus1.GET_VALUE() + " , " + plusMinus2.GET_VALUE() + "," + plusMinus3.GET_VALUE() + "," + plusMinus4.GET_VALUE() + ");";

            }



            if (checkBox1.Checked == true && listOfResImages.Text != "") {

                COMMAND_NEW_GO += "\n";
                Random rnd = new Random();
                int aniID = rnd.Next(999999);
                //string RES = listOfResImages.Items[listOfResImages.SelectedIndex];

                string RES = "";

                try
                {
                    RES = listOfResImages.GetItemText(listOfResImages.Items[listOfResImages.SelectedIndex]);
                }
                catch (Exception err)
                {
                    RES = listOfResImages.Text;
                    Console.Write("ERR BUT!!!!!!!!!!");
                }

                Console.Write(">>>>>" + RES);
                COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').CREATE_ANIMATION( SURF , 'LOOP' , 0 , RESOURCE." + RES + " , " + aniID + " , 'no' , 1,11,1,1,1);";
                COMMAND_NEW_GO += "\n";

            }

            if (checkBox2.Checked == true)
            {

                COMMAND_NEW_GO += "\n";
                
                if (selectColor_TEXTBOX.Text == "Color" || textColor.Text == "Text Color") {

                    selectColor_TEXTBOX.Text = "#0AF0AF";
                    textColor.Text = "#FFFFFF";

                }

                COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').CREATE_TEXTBOX('" + initialText.Text + "' , '" + RADIUSTEXTBOX.Text + "' , '" + selectColor_TEXTBOX.Text + "' , '" + textColor.Text + "');";

                COMMAND_NEW_GO += "\n";

            }

            if (checkBox3.Checked == true)
            {

                COMMAND_NEW_GO += "\n";


                if (webcamType == "NORMAL") {


                    COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').CREATE_WEBCAM('" + webcamType + "','" + "GAME_OBJECT" + "');";

                }
                else if (webcamType == "NUI") {

                    COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').CREATE_WEBCAM('" + webcamType + "','" + "GAME_OBJECT" + "' , '6' , '6'  );";

                }
                
                ////IamNewObject.CREATE_WEBCAM('NUI','GAME_OBJECT' , '6','6');
                COMMAND_NEW_GO += "\n";

            }

            if (checkBox4.Checked == true)
            {

                COMMAND_NEW_GO += "\n";
                COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').CREATE_PARTICLE('FONTAN');";
                COMMAND_NEW_GO += "\n";


            }

            if (checkBox5.Checked == true)
            {

                COMMAND_NEW_GO += "\n";
                COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').CREATE_COLLISION('BLOCK', '1.1');";
                COMMAND_NEW_GO += "\n";


            }

            


            // OTHER OPTIONS 

            if (DRAG.Checked == false) {

                  COMMAND_NEW_GO += "\n";
                  COMMAND_NEW_GO += program_name.Text + ".ENGINE.MODULES.ACCESS_MODULE( '" + modul_name.Text + "').GAME_OBJECTS.ACCESS('" + go_name.Text + "').DRAG = false;";
                  COMMAND_NEW_GO += "\n";
            }

                this.Close();

            //CLIENR_PATH  = CLIENR_PATH + "\\gui_generated_script\\";
            //System.IO.File.WriteAllText(CLIENR_PATH , COMMAND_NEW_GO );



        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
          


            if (checkBox1.Checked == true)
            {
             //  checkBox1.Enabled = false;
                listOfResImages.Enabled = true;
                checkBox3.Checked = false;
            }
            else
            {
           //     checkBox1.Enabled = true;
                listOfResImages.Enabled = false;


            }


        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
          

            if (checkBox2.Checked == true)
            { 
                initialText.Enabled = true;
                textColor.Enabled = true;
                RADIUSTEXTBOX.Enabled = true;
                selectColor_TEXTBOX.Enabled = true;

                checkBox3.Checked = false;
            }
            else
            { 
                initialText.Enabled = false;
                textColor.Enabled = false;
                RADIUSTEXTBOX.Enabled = false;
                selectColor_TEXTBOX.Enabled = false;


            }
             
        }
        
        private void selectColor_TEXTBOX_Click(object sender, EventArgs e)
        {
           

            if (colorDialog1.ShowDialog() == DialogResult.OK)
            { 
                    Console.WriteLine("Named color: {0}", colorDialog1.Color.Name);
                    Color color = colorDialog1.Color;

                    byte R = color.R;
                    byte G = color.G;
                    byte B = color.B;

                // selectColor_TEXTBOX.Text = colorDialog1.Color.ToArgb().ToString();
                //selectColor_TEXTBOX.Text = "rgba("+R+" , "+G+" , "+B+")";
                selectColor_TEXTBOX.Text = HexConverter(color);

            }


        }

        private void textColor_Click(object sender, EventArgs e)
        {

           

            if (colorDialog1.ShowDialog() == DialogResult.OK)
            {
                Console.WriteLine("Named color: {0}", colorDialog1.Color.Name);
                Color color = colorDialog1.Color;

                byte R = color.R;
                byte G = color.G;
                byte B = color.B;

                // selectColor_TEXTBOX.Text = colorDialog1.Color.ToArgb().ToString();
                //  textColor.Text = "rgba(" + R + " , " + G + " , " + B + ")";
                textColor.Text = HexConverter(color);

            }



        }


        private static String HexConverter(System.Drawing.Color c)
        {
            return "#" + c.R.ToString("X2") + c.G.ToString("X2") + c.B.ToString("X2");
        }

        private static String RGBConverter(System.Drawing.Color c)
        {
            return "RGB(" + c.R.ToString() + "," + c.G.ToString() + "," + c.B.ToString() + ")";
        }
        string webcamType = "NORMAL";
        private void checkBox3_CheckedChanged(object sender, EventArgs e)
        {
          


            if (checkBox3.Checked == true)
            {
                radioButton1.Enabled = true;
                radioButton2.Enabled = true;

                checkBox1.Checked = false;
                checkBox2.Checked = false;
                checkBox4.Checked = false;

            }
            else
            {
                radioButton1.Enabled = false;
                radioButton2.Enabled = false;
            }

             
        }
   
      
        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {
            webcamType = "NORMAL";
        }

        private void radioButton2_CheckedChanged(object sender, EventArgs e)
        {

            webcamType = "NUI";

        }

        private void checkBox4_CheckedChanged(object sender, EventArgs e)
        {
            


            if (checkBox4.Checked == true)
            {
                checkBox3.Checked = false;
            }
            else
            {
                
            }


        }

        private void checkBox5_CheckedChanged(object sender, EventArgs e)
        {

            if (checkBox5.Checked == true)
            {
                checkBox3.Checked = false;
            }

        }
    }
}

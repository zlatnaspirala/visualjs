using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Visual_JS
{
    public partial class About : Form
    {
        public About()
        {
            InitializeComponent();
        }
        System.Windows.Forms.Timer t = new System.Windows.Forms.Timer();
        private void button7_Click(object sender, EventArgs e)
        {
            this.Close();

        }

        private void label9_Click(object sender, EventArgs e)
        {

        }

        private void About_Load(object sender, EventArgs e)
        {

            formy = int.Parse( label9.Location.Y.ToString() ) ;

            t.Tick += new EventHandler(timer_Tick);
            t.Interval = 100;

            t.Start();
        }

        int formy = 700 ;
         Point Location1;

        void timer_Tick(object sender, EventArgs e)
        {
            //Call method
            formy = formy - 1;

           // label9.Location.Y = label9.Location.Y - 10;
           Location1 = new Point(label9.Location.X, formy );

            label9.Location = Location1;

            if (label9.Location.Y < -1200 )
            {
                Console.Write("label9.Location.Y" , label9.Location.Y);
                Location1 = new Point(label9.Location.X, 700);
                label9.Location = Location1;

            }

        }


    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Globalization;

namespace Visual_JS
{
    public partial class plusMinus : UserControl
    {


        public string GET_VALUE() {


            return VALUE.Text;

        }

        public plusMinus()
        {
            InitializeComponent();
        }

        private void VALUE_TextChanged(object sender, EventArgs e)
        {
            if (System.Text.RegularExpressions.Regex.IsMatch(VALUE.Text, "[^0-9]"))
            {
                MessageBox.Show("Please enter only numbers.");
                VALUE.Text.Remove(VALUE.Text.Length - 1);
            }
        }

        private void buttonPLUS_Click(object sender, EventArgs e)
        {

            VALUE.Text = ( float.Parse( VALUE.Text , CultureInfo.InvariantCulture)  + 1 ).ToString();

        }

        private void buttonMINUS_Click(object sender, EventArgs e)
        {

            VALUE.Text = (float.Parse(VALUE.Text, CultureInfo.InvariantCulture) - 1).ToString();
        }
    }
}

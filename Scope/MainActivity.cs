using System;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using Android.Webkit;

namespace Scope
{
    [Activity(Label = "Scope", Theme = "@android:style/Theme.NoTitleBar", MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity
    {
        int count = 1;

        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);

            // Get our button from the layout resource,
            // and attach an event to it
            //      Button button = FindViewById<Button>(Resource.Id.MyButton);
            //      button.Click += delegate { button.Text = string.Format("{0} clicks!", count++); };

            var pagina = FindViewById<WebView>(Resource.Id.Scope);
            pagina.Settings.JavaScriptEnabled = true;
            pagina.LoadUrl("file:///android_asset/index.html");
        }
    }
}


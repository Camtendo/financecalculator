using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RaikesFinancialCalculator.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Bonds()
        {
            return View();
        }

        public ActionResult PresentValue()
        {
            return View();
        }

        public ActionResult VentureCapital()
        {
            return View();
        }
    }
}

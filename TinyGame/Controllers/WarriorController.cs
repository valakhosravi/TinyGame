using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyGame.Models;

namespace TinyGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarriorController : ControllerBase
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet]
        public Warrior[] GetTasks()
        {
            Warrior[] warriors =
            {
                new Warrior {
                    id = 1,
                    nationality = "Thai",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/1.jpg"
                },
                new Warrior {
                    id = 2,
                    nationality = "Thai",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/2.jpg"
                },
                new Warrior {
                    id = 3,
                    nationality = "Korean",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/3.jpg"
                },
                new Warrior {
                    id = 4,
                    nationality = "Korean",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/4.jpg"
                },
                new Warrior {
                    id = 5,
                    nationality = "Korean",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/5.jpg"
                },
                new Warrior {
                    id = 6,
                    nationality = "Japanese",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/6.jpg"
                },
                new Warrior {
                    id = 7,
                    nationality = "Japanese",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/7.jpg"
                },
                new Warrior {
                    id = 8,
                    nationality = "Japanese",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/8.jpg"
                },
                new Warrior {
                    id = 9,
                    nationality = "Chinese",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/9.jpg"
                },
                new Warrior {
                    id = 10,
                    nationality = "Chinese",
                    imageSrc = "https://localhost:44380/StaticFiles/Images/10.jpg"
                },
            };
            return warriors;
        }


    }
}

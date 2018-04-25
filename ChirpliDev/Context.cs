using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqToTwitter;
using Microsoft.Extensions.Configuration;
using Linq2TwitterDemos_Console;

namespace chirpli
{
    public static class Context
    {
        static readonly IConfiguration Configuration;
        static IAuthorizer auth;
        static TwitterContext _twitterCtx;
        static SingleUserAuthorizer _singleUserAuthorizer;

        public static async Task<TwitterContext> GetTwitterCtx()
        {
                if (_twitterCtx == null)
                {
                    await singleUserAuthorizer.AuthorizeAsync();
                    _twitterCtx = new TwitterContext(singleUserAuthorizer);
                }

                return _twitterCtx;
        }

        public static SingleUserAuthorizer singleUserAuthorizer
        {
            get
            {
                return _singleUserAuthorizer;
            }

            set
            {
                _singleUserAuthorizer = value;
            }
        }


        private static async void GetTwitterContext()
        {
            //IAuthorizer auth = DoAuth();

            await singleUserAuthorizer.AuthorizeAsync();
            _twitterCtx = new TwitterContext(singleUserAuthorizer);
        }

        private static IAuthorizer DoAuth()
        {
            var auth = new SingleUserAuthorizer
            {
                CredentialStore = new SingleUserInMemoryCredentialStore
                {
                    ConsumerKey = Configuration["auth:" + OAuthKeys.AppConfigConsumerKey],
                    ConsumerSecret = Configuration["auth:" + OAuthKeys.AppConfigConsumerSecret],
                    AccessToken = Configuration["auth:" + OAuthKeys.AppConfigAccessToken],
                    AccessTokenSecret = Configuration["auth:" + OAuthKeys.AppconfigAccessTokenSecret]
                }
            };

            return auth;
        }
    }
}

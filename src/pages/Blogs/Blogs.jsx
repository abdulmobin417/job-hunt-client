import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import SubTitle from "../../components/SubTitle/SubTitle";
import useTitle from "../../hooks/useTitle";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Blogs = () => {
  useTitle("Blog");
  const expressCode = `const express = require('express');
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello, this is Express.js!');
  });

  app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
  });`;

  const nextjsCode = `import { Controller, Get } from '@nestjs/common';
  import { NestFactory } from '@nestjs/core';

  @Controller()
  class AppController {
    @Get()
    getHello(): string {
      return 'Hello, this is NestJS!';
    }
  }

  async function bootstrap() {
    const app = await NestFactory.create(AppController);
    await app.listen(3000);
  }
  bootstrap();
  `;
  return (
    <div className="space-y-4 px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1440px] md:px-24 lg:px-8 text-left text-2xl mb-10">
      <div className="my-10">
        <SubTitle title={"all blogs"} />
      </div>
      <details
        className="group border-l-4 border-[#f03737] bg-gray-100 shadow p-6"
        open
      >
        <summary className="flex cursor-pointer items-center justify-between">
          <h5 className="text-lg md:text-2xl font-medium text-gray-900">
            What is an access token and refresh token? How do they work and
            where should we store them on the client-side?
          </h5>

          <span className="ml-1.5 flex-shrink-0 rounded-full bg-gray-50 p-1.5 text-[#f03737] sm:p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="mt-4 text-justify leading-relaxed text-black text-base md:text-xl">
          Access tokens and refresh tokens are both components used in
          authentication protocols, often associated with OAuth or similar
          systems.
          <br />
          <br />
          <strong>Access Token:</strong>
          <br />
          <ul className="pl-10 mb-4">
            <li className="list-disc">
              <span className="md:text-xl font-semibold">Function: </span>
              An access token is a credential used to access protected
              resources, indicating the permissions granted to the client.{" "}
              {"It's"} typically time-limited and grants access to specific
              resources.
            </li>
            <li className="list-disc py-3">
              <span className="md:text-xl font-semibold">How it works: </span>
              When a user logs in or authenticates, they receive an access
              token. This token is sent with each request to the server to
              access protected resources. The server validates the token and
              allows access if {"it's"} valid.
            </li>
            <li className="list-disc">
              <span className="md:text-xl font-semibold">Storage: </span>
              Access tokens are typically stored on the client-side, such as in
              memory or local storage. They need to be securely handled to
              prevent unauthorized access.
            </li>
          </ul>
          <strong>Refresh Token:</strong>
          <br />
          <ul className="pl-10 mb-4">
            <li className="list-disc">
              <span className="md:text-xl font-semibold">Function: </span>A
              refresh token is a long-lived credential used to obtain a new
              access token after the original access token expires.
            </li>
            <li className="list-disc py-3">
              <span className="md:text-xl font-semibold">How it works: </span>
              When an access token expires, the client uses the refresh token to
              obtain a new access token without requiring the user to log in
              again. This process helps to maintain continuous access to
              resources.
            </li>
            <li className="list-disc">
              <span className="md:text-xl font-semibold">Storage: </span>
              Refresh tokens should be handled very securely because they grant
              the ability to obtain new access tokens. They are usually stored
              in more secure locations, such as an HTTP-only cookie or a secure
              storage mechanism provided by the platform or framework (for
              instance, in the case of web applications, a server-side session).
            </li>
          </ul>
          <strong>Storage on the Client-side:</strong>
          <br />
          <ul className="pl-10">
            <li className="list-disc">
              <span className="md:text-xl font-semibold">Access Tokens: </span>
              These are stored on the client-side because {"they're"} required
              for each request to access protected resources. However, they
              should be stored securely to prevent unauthorized access. Common
              places include browser memory (variables) or local storage. Using
              browser memory is generally safer than local storage due to the
              risk of XSS attacks on the latter.
            </li>
            <li className="list-disc py-3">
              <span className="md:text-xl font-semibold">Refresh Tokens: </span>
              Due to their sensitivity and long-term nature, refresh tokens
              should be stored in more secure locations. Commonly, they are
              stored on the server-side in a secure database or within an
              HTTP-only cookie if {"we're"} working with a web application.
            </li>
          </ul>
        </div>
      </details>
      <details className="group border-l-4 border-[#f03737] bg-gray-100 shadow p-6">
        <summary className="flex cursor-pointer items-center justify-between">
          <h5 className="text-lg text-left md:text-2xl font-medium text-gray-900">
            What is express js? What is Nest JS?
          </h5>

          <span className="ml-1.5 flex-shrink-0 rounded-full bg-gray-50 p-1.5 text-[#f03737] sm:p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <div>
          <br />
          <strong className="text-lg md:text-2xl">Express.js:</strong>
          <br />
          <br />
          <p className="text-lg md:text-2xl">
            Express.js is a minimalist and flexible Node.js web application
            framework that provides a robust set of features for web and mobile
            applications. {"It's"} built on top of Node.js and is widely used
            for building web servers and APIs. <br />
            <br />
            {"Here's"} a simple example of an Express.js server: <br />
            <br />
          </p>
          <SyntaxHighlighter language="javascript" style={darcula}>
            {expressCode}
          </SyntaxHighlighter>
          <br />
          <p className="text-lg md:text-2xl font-semibold">In this example:</p>
          <ul className="pl-10 text-lg md:text-2xl">
            <li className="list-disc">
              {`require('express')`} imports the Express module.
            </li>
            <li className="list-disc">
              express() creates an instance of the Express application.
            </li>
            <li className="list-disc">
              {`app.get() defines a route for the root URL ('/') that responds with
          'Hello, this is Express.js!' when accessed via HTTP GET method.`}
            </li>
            <li className="list-disc">
              app.listen() starts the server on port 3000, and it logs a message
              to the console when the server starts.
            </li>
          </ul>
          <br />
          <strong className="text-lg md:text-2xl">NestJS:</strong>
          <p className="text-lg md:text-2xl">
            NestJS is a progressive Node.js framework {"that's"} built with
            TypeScript and heavily inspired by Angular. {"It's"} designed to
            create efficient, reliable, and scalable server-side applications.
            NestJS combines elements of OOP, functional programming, and
            reactive programming. <br />
            <br />
            Below is an example of a basic NestJS application:
            <br />
            <br />
            Firstly, we need to set up a NestJS application using the NestJS CLI
            or manually by installing the necessary packages and configuring our
            files. Then, our code might look something like this:
            <br />
            <br />
          </p>
          <SyntaxHighlighter language="javascript" style={darcula}>
            {nextjsCode}
          </SyntaxHighlighter>
          <br />
          <p className="text-lg md:text-2xl font-semibold">In this example:</p>
          <ul className="pl-10 text-lg md:text-2xl">
            <li className="list-disc">
              {`@nestjs/common provides decorators for building controllers, such as @Controller and @Get.`}{" "}
            </li>
            <li className="list-disc">
              {`The AppController class defines a controller that handles the root URL ('/') and returns 'Hello, this is NestJS!' for an HTTP GET request.`}
            </li>
            <li className="list-disc">
              {`app.get() defines a route for the root URL ('/') that responds with
          'Hello, this is Express.js!' when accessed via HTTP GET method.`}
            </li>
            <li className="list-disc">
              {`NestFactory.create() creates a Nest application instance using the AppController, and app.listen() starts the server on port 3000.`}
            </li>
          </ul>
          <br />
          <br />
        </div>
      </details>
      <details className="group border-l-4 border-[#f03737] bg-gray-100 shadow p-6">
        <summary className="flex cursor-pointer items-center justify-between">
          <h5 className="text-lg text-left md:text-2xl font-medium text-gray-900">
            My Job Gator Project Overview
          </h5>
          <span className="ml-1.5 flex-shrink-0 rounded-full bg-gray-50 p-1.5 text-[#f03737] sm:p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div>
          <br />
          <strong className="text-lg md:text-2xl">What is My Job Gator:</strong>
          <br />
          <br />
          <p className="text-lg md:text-2xl">
            A user can see jobs which is posted by our logged in users. Our
            logged in user can see the job details like which company is
            recruiting, when is the application deadline, how many vacancy is
            there and what are the requirements for this job post. He/She can
            apply any job which jobs deadline still left. If application
            deadline is over then no user can be able to apply on this job. Our
            logged in user can also post a job but the user {"can't"} apply
            his/her own posting jobs. Other user can apply the jobs. User can
            update his/her own posted jobs only.
            <br />
          </p>
          <br />
          <p className="text-lg md:text-2xl font-semibold">Project Feature:</p>
          <ul className="pl-10 text-lg md:text-2xl">
            <li className="list-disc">User can post job</li>
            <li className="list-disc">Can update his own job</li>
            <li className="list-disc">Apply jobs expect his own posted jobs</li>
            <li className="list-disc">Can Update his/her own posted jobs</li>
            <li className="list-disc">Can see his/her applied jobs</li>
            <li className="list-disc">
              Search his/her desire jobs by job title
            </li>
            <li className="list-disc">
              Filter his/her applied jobs by categories
            </li>
          </ul>
          <br />
          <p className="text-lg md:text-2xl font-semibold">
            Project Functionality:
          </p>
          <ul className="pl-10 text-lg md:text-2xl">
            <li className="list-disc">
              Firebase Authentication by Email and Password
            </li>
            <li className="list-disc">Firebase Authentication by Google</li>
            <li className="list-disc">
              React Toastify use for successful, warning, information message
            </li>
            <li className="list-disc">
              React Counter Js used for home page stats
            </li>
            <li className="list-disc">
              React Query used for some CRUD operations
            </li>
            <li className="list-disc">Node JS, Express JS, CORs used in Backend</li>
            <li className="list-disc">JWT used in two API for protecting route</li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default Blogs;

## **Frontend Documentation**

This documentation provides an overview of the frontend routes and their functionality. It covers three main routes: `"/"`, `"/calendar"`, and `"/list"`. Each route offers different features related to keyword monitoring, scheduling, and viewing reports.

### **Routes Overview**

1. **`/`**: The main page where users can input URLs and keywords for analysis.
2. **`/calendar`**: The calendar page where users can view task.
3. **`/list`**: The list page where users can view all generated reports.

---

### **1. `/` - Keyword and URL Input**

This route allows users to input URLs and associated keywords for analysis. The frontend then sends the information to the backend for processing.

#### **Features:**

- **URsL Input**: Allows users to specify the URLs for analysis.
- **Keyword Input**: Users can provide keywords for the analysis of the specified URLs.
- **Submit**: Once the user has filled in the URL and keywords, they can submit the form to start the analysis or schedule it.

#### **Route Details:**

```plaintext
Route: /
Method:  POST
Description: This is the main input page for submitting URLs and keywords.
```

#### **Backend Integration:**

- **POST Request to**: `/schedule-task`
  When the user selects to schedule a task, the frontend sends a POST request with the following data:
  URL: The website URL to analyze.
  Keywords: A list of keywords to track.
  Email: The user's email for report delivery.
  Schedule: Whether the task is scheduled or immediate.
  ScheduleAt: The specific date and time for the scheduled task (if applicable).
  RepeatMonthly: A flag indicating whether the task should repeat monthly.
  Title: The title of the report.
  ReportType: The type of report.
  Tags: Tags for categorizing the report.
  UserId: A unique identifier for the user (e.g., IP address and user agent).

  **Description**: This endpoint handles the scheduling of tasks. If the user has selected a specific date and time for the task, this information will be stored in the backend for later execution.

  **POST Request to**: `/analyze`
  When the user selects Run Now, the frontend sends a POST request with the following data:
  URL: The website URL to analyze.
  Keywords: A list of keywords to track.
  Email: The user's email for report delivery.
  Schedule: A flag set to false as the task is being executed immediately.
  RepeatMonthly: A flag indicating whether the task should repeat monthly.
  Title: The title of the report.
  ReportType: The type of report.
  Tags: Tags for categorizing the report.
  UserId: A unique identifier for the user (e.g., IP address and user agent).

  **Description**: This endpoint processes the task immediately. As the task is executed right away, the backend generates the report and returns it to the user in real-time.

---

### **2. `/calendar` - Calendar View for Scheduled Tasks**

This route displays a calendar with scheduled tasks. Users can view when their tasks are scheduled and manage them accordingly.

#### **Features:**

- **View Tasks**: Displays all tasks that have been scheduled.
- **Calendar Integration**: Users can interact with the calendar to see upcoming tasks.

#### **Route Details:**

```plaintext
Route: /calendar
Method: GET
Description: Displays a calendar with scheduled tasks.
```

#### **Functionality:**

- Users can view their upcoming tasks on a calendar interface.
- Each task is displayed on the calendar with its scheduled time.
- Clicking on a task displays more details, such as the report title, the scheduled time, and options to modify or delete the task.

The calendar is interactive, and users can select dates to view scheduled tasks and their details.

#### **Backend Integration:**

- **GET Request to**: `/schedule-task/:id`  
  The frontend queries the backend to retrieve a list of all scheduled tasks, which are then displayed in the calendar.

---

### **3. `/list` - List of Generated Reports**

This route allows users to see all reports that have been generated. It provides a list of reports that the user has requested, including the URL of the reports and the date they were created.

#### **Features:**

- **View Reports**: Displays a list of generated reports.
- **Download Links**: Each report has a link to view or download the generated file.
- **Pagination**: If there are multiple reports, the list will include pagination to navigate through pages.

#### **Route Details:**

```plaintext
Route: /list
Method: GET
Description: Displays a list of all generated reports.
```

#### **Report List Details:**

- **Title**: The title of the report.
- **File URL**: A direct URL to the generated report.

#### **Backend Integration:**

- **GET Request to**: `/getfile/:id`  
  The frontend queries the backend to fetch the list of generated reports.

---

This frontend documentation covers the key routes and features, ensuring that the user can interact with the backend for task submission, scheduling, and viewing generated reports. It also addresses backend integration for managing tasks and reports.

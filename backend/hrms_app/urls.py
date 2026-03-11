from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet, EmployeeAttendanceView
from . import views


router = DefaultRouter()

router.register(r'employees', EmployeeViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('attendance-history/<int:employee_id>/', EmployeeAttendanceView.as_view()),

    path('employees/', views.EmployeeListCreateView.as_view()),
    path('employees/<int:pk>/', views.EmployeeDeleteView.as_view()),

    path('attendance/', views.AttendanceCreateView.as_view()),
    path('attendance-history/<int:emp_id>/', views.AttendanceHistoryView.as_view()),
]
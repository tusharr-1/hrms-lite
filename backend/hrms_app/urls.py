from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet, EmployeeAttendanceView

router = DefaultRouter()

router.register(r'employees', EmployeeViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('attendance-history/<int:employee_id>/', EmployeeAttendanceView.as_view()),
]
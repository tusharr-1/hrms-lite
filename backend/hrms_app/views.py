from django.shortcuts import render
from rest_framework import viewsets
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class EmployeeViewSet(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class AttendanceViewSet(viewsets.ModelViewSet):

    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    
class EmployeeAttendanceView(APIView):

    def get(self, request, employee_id):

        attendance = Attendance.objects.filter(employee_id=employee_id).order_by('-date')

        serializer = AttendanceSerializer(attendance, many=True)

        return Response(serializer.data)
from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = '__all__'

    def validate(self, data):

        instance = self.instance

        employee_id = data.get("employee_id")
        email = data.get("email")

        # CREATE
        if not instance:

            if Employee.objects.filter(employee_id=employee_id).exists():
                raise serializers.ValidationError({
                    "employee_id": "Employee ID already exists"
                })

            if Employee.objects.filter(email=email).exists():
                raise serializers.ValidationError({
                    "email": "Email already exists"
                })

        # UPDATE
        else:

            if employee_id:
                if Employee.objects.filter(employee_id=employee_id).exclude(id=instance.id).exists():
                    raise serializers.ValidationError({
                        "employee_id": "Employee ID already exists"
                    })

            if email:
                if Employee.objects.filter(email=email).exclude(id=instance.id).exists():
                    raise serializers.ValidationError({
                        "email": "Email already exists"
                    })

        return data


class AttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendance
        fields = '__all__'

    def validate(self, data):

        employee = data.get("employee")
        date = data.get("date")

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date"
            )

        return data

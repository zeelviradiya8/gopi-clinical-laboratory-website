#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime, timedelta

class MedicalLabAPITester:
    def __init__(self, base_url="https://trusted-pathology-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_result(self, test_name, success, details=""):
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name}")
        else:
            print(f"❌ {test_name} - {details}")
            self.failed_tests.append(f"{test_name}: {details}")

    def test_health_check(self):
        """Test API health check"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                details += f", Response: {response.json()}"
            self.log_result("Health Check", success, details)
            return success
        except Exception as e:
            self.log_result("Health Check", False, f"Exception: {str(e)}")
            return False

    def test_get_packages(self):
        """Test fetching health packages"""
        try:
            response = requests.get(f"{self.base_url}/api/packages", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    details += f", Found {len(data)} packages"
                    # Check if required packages are present
                    package_names = [pkg.get('name', '') for pkg in data]
                    required_packages = ['Basic Health Checkup', 'Senior Citizen Package', 'Pre-Employment Package']
                    missing = [pkg for pkg in required_packages if not any(pkg in name for name in package_names)]
                    if missing:
                        details += f", Missing packages: {missing}"
                        success = False
                else:
                    details += ", No packages found"
                    success = False
            
            self.log_result("Get Health Packages", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_result("Get Health Packages", False, f"Exception: {str(e)}")
            return False, []

    def test_create_booking(self):
        """Test creating a test booking"""
        booking_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "phone": "+91 98765 43210",
            "test_type": "Basic Health Checkup",
            "preferred_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
            "address": "123 Test Street, Test City, 400001",
            "notes": "This is a test booking"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/bookings",
                json=booking_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                result = response.json()
                if result.get('id') and result.get('name') == booking_data['name']:
                    details += f", Booking ID: {result.get('id')}"
                else:
                    details += ", Invalid response structure"
                    success = False
            else:
                details += f", Error: {response.text}"
            
            self.log_result("Create Booking", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_result("Create Booking", False, f"Exception: {str(e)}")
            return False, {}

    def test_get_bookings(self):
        """Test fetching all bookings"""
        try:
            response = requests.get(f"{self.base_url}/api/bookings", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", Found {len(data)} bookings"
            
            self.log_result("Get Bookings", success, details)
            return success
        except Exception as e:
            self.log_result("Get Bookings", False, f"Exception: {str(e)}")
            return False

    def test_create_contact(self):
        """Test creating a contact inquiry"""
        contact_data = {
            "name": f"Contact User {datetime.now().strftime('%H%M%S')}",
            "email": "contact@example.com",
            "phone": "+91 98765 43210",
            "message": "This is a test contact inquiry message"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/contacts",
                json=contact_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                result = response.json()
                if result.get('id') and result.get('name') == contact_data['name']:
                    details += f", Contact ID: {result.get('id')}"
                else:
                    details += ", Invalid response structure"
                    success = False
            else:
                details += f", Error: {response.text}"
            
            self.log_result("Create Contact", success, details)
            return success
        except Exception as e:
            self.log_result("Create Contact", False, f"Exception: {str(e)}")
            return False

    def test_get_contacts(self):
        """Test fetching all contacts"""
        try:
            response = requests.get(f"{self.base_url}/api/contacts", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", Found {len(data)} contacts"
            
            self.log_result("Get Contacts", success, details)
            return success
        except Exception as e:
            self.log_result("Get Contacts", False, f"Exception: {str(e)}")
            return False

    def test_invalid_booking(self):
        """Test creating booking with invalid data"""
        invalid_data = {
            "name": "",  # Invalid: empty name
            "email": "invalid-email",  # Invalid: bad email format
            "phone": "+91 98765 43210",
            "test_type": "Basic Health Checkup",
            "preferred_date": "2024-12-15",
            "address": "123 Test Street"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/bookings",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            # Should fail with validation error
            success = response.status_code == 422  # FastAPI validation error
            details = f"Status: {response.status_code}"
            if not success:
                details += f", Expected 422 for validation error but got different status"
            
            self.log_result("Invalid Booking Validation", success, details)
            return success
        except Exception as e:
            self.log_result("Invalid Booking Validation", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🧪 Starting Medical Laboratory API Tests")
        print("=" * 50)
        
        # Basic connectivity
        if not self.test_health_check():
            print("❌ Health check failed - API might be down")
            return self.print_summary()
        
        # Core functionality tests
        packages_success, packages_data = self.test_get_packages()
        booking_success, booking_data = self.test_create_booking()
        self.test_get_bookings()
        
        contact_success = self.test_create_contact()
        self.test_get_contacts()
        
        # Validation test
        self.test_invalid_booking()
        
        return self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 50)
        print(f"📊 Test Summary")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for failed_test in self.failed_tests:
                print(f"   • {failed_test}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"\n✅ Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Backend APIs are working well!")
            return 0
        elif success_rate >= 50:
            print("⚠️  Backend APIs have some issues but core functionality works")
            return 1
        else:
            print("🚨 Backend APIs have major issues")
            return 2

def main():
    tester = MedicalLabAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())